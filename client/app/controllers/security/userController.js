app.controller('UserController', function ($scope, userService) {

    init();

    $scope.user = {};

    function init() {}

    $scope.showModalAddUser = function (e) {
        e.preventDefault();
        $scope.user = {};
        $scope.user.title = 'Nuevo Usuario';
        $('#modal-user').modal();
    }

    $scope.saveUser = function () {
        var response = $scope.user._id ? userService.edit($scope.user) : userService.save($scope.user);
        response.then(function (data) {
            loadDataInformation();
            toastr.success("Satisfactoriamente Guardado");
        });
        $('#modal-user').modal('hide');
    }

    function loadDataInformation() {
        var response = userService.getUsers();
        response.then(function (users) {
            $scope.users = users;
        });
    }

    $scope.showModalEditUser = function (e, user) {
        e.preventDefault();
        $scope.user = angular.copy(user);

        $scope.user.title = 'Editar Usuario';
        $('#modal-user').modal();
    }



    $scope.deleteUser = function () {
        var response = userService.remove($scope.user._id);
        response.then(function (data) {
            $('#modal-confirmation').modal('hide');
            loadDataInformation();
            toastr.success("Satisfactoriamente Eliminado");;
        });
    }



});
