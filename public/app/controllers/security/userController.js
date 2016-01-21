app.controller('UserController', function ($scope, userService) {

	init();

	$scope.user = {};

	function init() {
		loadUsers();
	}

	$scope.showModalAddUser = function (e) {
		e.preventDefault();
		$scope.user = {};
		$scope.user.title = 'Nuevo Usuario';
		$('#modal-user').modal();
	}

	$scope.saveUser = function () {
		var response = $scope.user._id ? userService.edit($scope.user) : userService.save($scope.user);
		response.then(function (data) {
			loadUsers();
			toastr.success("Satisfactoriamente Guardado");
		});
		$('#modal-user').modal('hide');
	}

	function loadUsers() {
		var response = userService.getUsers();
		response.then(function (users) {			
			$scope.users = users;
		});
	}

	$scope.showModalEditUser = function (e, user) {
		e.preventDefault();
		$scope.user = angular.copy(user);
		$scope.user.Role = getCurrentRoleForEdit(user.Role);
		$scope.user.title = 'Editar Usuario';
		$('#modal-user').modal();
	}

	$scope.showModalConfirmation = function (e, user) {
		e.preventDefault();
		$scope.user = user;
		$('#modal-confirmation-user').modal();
	}

	$scope.deleteUser = function () {
		var response = userService.remove($scope.user._id);
		response.then(function (data) {
			loadUsers();
			toastr.success("Satisfactoriamente Eliminado");;
		});
	}

	function getCurrentRoleForEdit(role) {
		var roleInList = $scope.roles.where(function (roleItem) {
			return roleItem.Name == role.Name;
		}).first();
		return roleInList;
	}

	$scope.roles = [
		{
			Name: 'Administrador',
			Description: 'Super Admin'
		},
		{
			Name: 'Vendedor',
			Description: 'Vendedor solo ventas'
		},
		{
			Name: 'Propietario',
			Description: 'Propietario'
		}
	];

});