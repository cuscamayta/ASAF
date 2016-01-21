/* global $ */
/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/* global toastr */
app.controller('ProductController', function ($scope, productService, typeProductService) {

	init();

	function init() {
		getProductTypes();
		$scope.product = {};
		loadProducts();
	}

	$scope.showModalAddProduct = function (e) {
		e.preventDefault();
		$scope.product = {};
		$scope.product.title = 'Nuevo Producto';
		$('#modal-product').modal();
	};

	$scope.saveProduct = function () {
		$scope.product.ProductType = $scope.currentProductType._id;
		var response = $scope.product._id ? productService.edit($scope.product) : productService.save($scope.product);
		response.then(function (data) {
			loadProducts();
			toastr.success("Satisfactoriamente Guardado");
		});
		$('#modal-product').modal('hide');
	};

	function loadProducts() {
		var response = productService.getProducts();
		response.then(function (products) {
			$scope.products = products;
		});
	}



	$scope.showModalEditProduct = function (e, product) {
		e.preventDefault();
		$scope.product = angular.copy(product);
		$scope.currentProductType = getCurrentProductTypeForEdit(product.ProductType);
		$scope.product.title = 'Editar Producto';
		$('#modal-product').modal();
	};

	$scope.showModalConfirmation = function (e, product) {
		e.preventDefault();
		$scope.product = product;
		$('#modal-confirmation-product').modal();
	};

	$scope.deleteProduct = function () {
		var response = productService.remove($scope.product._id);
		response.then(function (data) {
			loadProducts();
			toastr.success("Satisfactoriamente Eliminado");;
		});
	};

	function getProductTypes() {
		$scope.productTypes = [];
		var response = typeProductService.getTypeProducts();
		response.then(function (productTypes) {
			$scope.productTypes = productTypes;
		});
	}

	function getCurrentProductTypeForEdit(productType) {
		var productTypeInList = $scope.productTypes.where(function (productType) {
			return productType._id == productType._id;
		}).first();
		return productTypeInList;
	}
});