var app = angular.module('customersApp', []);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/producto', {
			controller: 'ProductController',
			templateUrl: '/app/partials/inventory/product.html'
		})
		.when('/producto/:id', {
			controller: 'CustomerOrdersController',
			templateUrl: '/app/partials/inventory/product.html'
		})
		.when('/tipoProducto', {
			controller: 'TypeProductController',
			templateUrl: '/app/partials/inventory/typeProduct.html'
		})
		.when('/', {
			controller: 'SalesController',
			templateUrl: '/app/partials/sales/sales.html'
		})
		.when('/inicio1', {
			controller: 'HomeController',
			templateUrl: '/app/partials/home/home.html'
		})
		.when('/usuario', {
			controller: 'UserController',
			templateUrl: '/app/partials/security/user.html'
		})
		.when('/ventas', {
			controller: 'SalesController',
			templateUrl: '/app/partials/sales/sales.html'
		})
		.when('/ventasInfo', {
			controller: 'salesInfoController',
			templateUrl: '/app/partials/sales/salesInfo.html'
		})
		.when('/productTransaction', {
			controller: 'ProductTransactionController',
			templateUrl: '/app/partials/inventory/productTransaction.html'
		})
		.when('/login', {
			controller: 'SecurityController',
			templateUrl: '/app/partials/security/login.html'
		})
		.when('/reportes', {
			controller: 'ReportController',
			templateUrl: '/app/partials/reports/reporter.html'
		})
		.when('/inicio', {
			controller: 'SalesController',
			templateUrl: '/app/partials/sales/sales.html'
		})

	.otherwise({
		redirectTo: '/sales'
	});


});

app.run(function ($rootScope, $location) {

	var menus = [
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
			Url: '',
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
					Name: 'Producto Transaccion',
					PseudoUrl: '/productTransaction',
					Url: '#/productTransaction'
				}
			]
		},
		{
			Name: 'Seguridad',
			PseudoUrl: '/seguridad',
			Url: '',
			SubMenu: [
				{
					Name: 'Usuarios',
					PseudoUrl: '/usuario',
					Url: '#/usuario'
				},
				{
					Name: 'logout',
					PseudoUrl: '/login',
					Url: '#/login'
				}
			]
		},
	];



	$rootScope.generateMenuForRole = function (user, isInit) {
		$rootScope.Menus = [];
		localStorage.removeItem('user');
		localStorage.setItem('user', JSON.stringify(user));
		if (user.Role.Name == 'Vendedor') {
			$rootScope.Menus.push(menus[1]);
			var menuSecurity = angular.copy(menus[3]);
			menuSecurity.SubMenu.splice(0, 1);
			$rootScope.Menus.push(menuSecurity);
			$location.path('/ventas');
		} else {
			$rootScope.Menus = menus;
			if (isInit)
				$location.path('/inicio');
		}
	}

	loadUserSession();

	function loadUserSession() {
		var userSession = localStorage.getItem('user');
		if (userSession) {
			$rootScope.Menus = $rootScope.menus;
			$rootScope.generateMenuForRole(JSON.parse(userSession));
		} else {
			$rootScope.Menus = [];
			$location.path('/login');
		}
	}
});