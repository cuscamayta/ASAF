app.controller('SecurityController', function ($scope, securityService, $rootScope, $location) {
	init();

	function init() {
		$scope.User = {};
		//$('.asaf-navbar').hide();
	}

	$scope.login = function () {
		var response = securityService.login($scope.User);
		response.then(function (data) {
			if (data.length > 0)
				generateMenuForRole(data.first());
			else
				errorLogin();
		});
	}

	function errorLogin() {
		$scope.isAuthenticate = false;
		$scope.loginMessage = "El correo electrónico o la contraseña que ingresaste son incorrectos.";
	}

	var menus = [
		{
			Name: 'Dashboard',
			Url: '#/inicio',
			PseudoUrl: '/inicio',
			SubMenu: []
		},
		{
			Name: 'Reportes',
			Url: '#/reportes',
			PseudoUrl: '/reportes',
			SubMenu: []
		},
		{
			Name: 'Ventas',
			Url: '#/ventas',
			PseudoUrl: '/ventas',
			SubMenu: []
		},
		{
			Name: 'Inventario',
			PseudoUrl: '/inventario',
			Url: '#/inventario',
			SubMenu: [
				{
					Name: 'Producto',
					PseudoUrl: '/producto',
					Url: '#/producto'

				},
				{
					Name: 'Tipo Producto',
					PseudoUrl: '/tipoProducto',
					Url: '#/tipoProducto'
				},
				{
					Name: 'Proveedor',
					PseudoUrl: '/proveedor',
					Url: '#/proveedor'
				}
		]
		},
		{
			Name: 'Seguridad',
			Url: '',
			SubMenu: [
				{
					Name: 'Usuarios',
					PseudoUrl: '/usuario',
					Url: '#/usuario'
				},
				{
					Name: 'Cambiar Password',
					PseudoUrl: '/resetPass',
					Url: ''
				},
				{
					Name: 'Permisos',
					PseudoUrl: '/permisos',
					Url: ''
				},
		]
		},
	];

	function generateMenuForRole(user) {
		$scope.isAuthenticate = true;
		if (user.Role.Name == 'Vendedor') {
			$('#menu-admin').hide();
			$('#menu-sale').show();
			$('.user-logged').html(user.Name);
			//			$rootScope.Menus.push(menus[2]);
			$location.path('/ventas');
		} else {
			$('#menu-sale').hide();
			$('#menu-admin').show();
			$('.user-logged').html(user.Name);
			//			$rootScope.Menus = menus;
			$location.path('/inicio');
		}
	}
});
