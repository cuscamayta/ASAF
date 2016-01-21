app.controller('SecurityController', function ($scope, securityService, $rootScope, $location) {
	init();

	function init() {
		$scope.User = {};
		$rootScope.Menus = [];
		localStorage.removeItem('user');		
	}
	
	

	$scope.login = function () {
		var response = securityService.login($scope.User);
		response.then(function (data) {
			if (data.length > 0){
				$scope.isAuthenticate = true;
				$rootScope.generateMenuForRole(data.first(),true);}
			else
				errorLogin();
		});
	}

	function errorLogin() {
		$scope.isAuthenticate = false;
		$scope.loginMessage = "El correo electrónico o la contraseña que ingresaste son incorrectos.";
	}
});