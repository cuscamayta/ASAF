app.controller('ProductController', function ($scope, productService) {

	init();

	function init() {
		$scope.product = {};
		loadProducts();
	}

	$scope.showModalAddProduct = function (e) {
		e.preventDefault();
		$scope.product = {};
		$scope.product.title = 'Nuevo Producto';
		$('#modal-product').modal();
	}

	$scope.saveProduct = function () {
		var response = $scope.product._id ? productService.edit($scope.product) : productService.save($scope.product);
		response.then(function (data) {
			loadProducts();
			toastr.success("Satisfactoriamente Guardado");
		});
		$('#modal-product').modal('hide');
	}

	function loadProducts() {
		var response = productService.getProducts();
		response.then(function (products) {
			$scope.products = products;
		});
	}

	$scope.showModalEditProduct = function (e, product) {
		e.preventDefault();
		$scope.product = angular.copy(product);

		$scope.product.title = 'Editar Producto';
		$('#modal-product').modal();
	}

	$scope.showModalConfirmation = function (e, product) {
		e.preventDefault();
		$scope.product = product;
		$('#modal-confirmation-product').modal();
	}

	$scope.deleteProduct = function () {
		var response = productService.remove($scope.product._id);
		response.then(function (data) {
			loadProducts();
			toastr.success("Satisfactoriamente Eliminado");;
		});
	}



	$scope.productTypes = [{
		Name: "Tipo 001",
		Description: "Description Type"
    }, {
		Name: "Tipo 00145",
		Description: "Description Type"
    }, {
		Name: "Tipo 005251",
		Description: "Description Type"
    }];

});
