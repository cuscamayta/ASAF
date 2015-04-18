app.controller('UserController', function ($scope) {

	init();

	$scope.user = {};

	function init() {
	}

	$scope.showModalAddUser = function (e) {
		e.preventDefault();
		$scope.user = {};
		$scope.user.title = 'Nuevo Usuario';
		$('#modal-user').modal();
	}

	$scope.addUser = function () {
		$scope.user.UserId = new Date().getMilliseconds();
		$scope.user.push($scope.user);
		$('#modal-user').modal('hide');
	}

	$scope.showModalEditUser = function (e, user) {
		e.preventDefault();
		$scope.user = angular.copy(user);

		$scope.user.title = 'Editar Usuario';
		$('#modal-user').modal();
	}

	$scope.editUser = function (user) {

	}

	$scope.deleteUser = function (e, user) {
		e.preventDefault();
		$scope.user = product;
		$('#modal-confirmation').modal();
	}

	$scope.users = [{
		UserId: 1,
		Name: 'User 001',
		LastName: 'Suarez 001',
		EnterDate: '10/04/2015',
		Role: 'adm',
		Password:'1234567'
    }, {
		UserId: 2,
		Name: 'User 002',
		LastName: 'Suarez 002',
		EnterDate: '10/04/2015',
		Role: 'adm',
		Password:'1234567'
    }, {
		UserId: 3,
		Name: 'User 003',
		LastName: 'Suarez 003',
		EnterDate: '10/04/2015',
		Role: 'adm',
		Password:'1234567'
    }, {
		UserId: 4,
		Name: 'User 004',
		LastName: 'Suarez 004',
		EnterDate: '10/04/2015',
		Role: 'adm',
		Password:'1234567'
    }, {
		UserId: 5,
		Name: 'User 005',
		LastName: 'Suarez 005',
		EnterDate: '10/04/2015',
		Role: 'adm',
		Password:'1234567'
    }];

});
