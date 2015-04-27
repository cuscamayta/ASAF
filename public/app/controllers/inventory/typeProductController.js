app.controller('TypeProductController', function ($scope, typeProductService) {

	init();

	function init() {
		$scope.typeProduct = {};
		loadTypeProducts();
	}

	$scope.showModalAddTypeProduct = function (e) {
		e.preventDefault();
		$scope.typeProduct = {};
		$scope.typeProduct.title = 'Nuevo Producto';
		$('#modal-type-product').modal();
	}

	$scope.saveTypeProduct = function () {
		var response = $scope.typeProduct._id ? typeProductService.edit($scope.typeProduct) : typeProductService.save($scope.typeProduct);
		response.then(function (data) {
			loadTypeProducts();
			toastr.success("Satisfactoriamente Guardado");
		});
		$('#modal-type-product').modal('hide');
	}

	function loadTypeProducts() {
		var response = typeProductService.getTypeProducts();
		response.then(function (typeProducts) {
			$scope.typeProducts = typeProducts;
		});
	}

	$scope.showModalEditTypeProduct = function (e, typeProduct) {
		e.preventDefault();
		$scope.typeProduct = angular.copy(typeProduct);

		$scope.typeProduct.title = 'Editar Producto';
		$('#modal-type-product').modal();
	}

	$scope.showModalConfirmation = function (e, typeProduct) {
		e.preventDefault();
		$scope.typeProduct = typeProduct;
		$('#modal-confirmation-typeproduct').modal();
	}

	$scope.deleteTypeProduct = function () {
		var response = typeProductService.remove($scope.typeProduct._id);
		response.then(function (data) {
			loadTypeProducts();
			toastr.success("Satisfactoriamente Eliminado");;
		});
	}


});
