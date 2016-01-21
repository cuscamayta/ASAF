/* global app */
app.controller('SalesController', function ($scope, salesService, productService) {

	init();

	$scope.productSales = [];
	$scope.invoice = {
		companyName: 'WordCell',
		subsidiary: 'Sucursal N.1',
		adress: 'Mercado Ramada #465 UV 67',
		phone: '39478936',
		date: new Date().toDateString(),
		clientName: 'S/N',
		clientNit: '00000000',
		productSales: [],
		total: 0,
		clientCoin: 25,
		changeCoin: 0
	};


	function loadProducts() {
		var response = productService.getProducts();
		$scope.products = [];
		response.then(function (products) {
			angular.forEach(products, function (product) {
				if (filterProductsByStock(product) > 0) {
					$scope.products.push(product);
					product.StockInitial = product.Stock;
				}
			});
		});
	}

	function filterProductsByStock(product) {
		var income = sumTransactions(product.ProductTransactions, true),
			outCome = sumTransactions(product.ProductTransactions, false);


		function sumTransactions(productTransactions, typeTransaction) {
			return productTransactions.where(function (transaction) {
				return transaction.Income == typeTransaction;
			}).sum(function (item) {
				return item.Quantity;
			});
		}
		product.Stock = income - outCome;
		return product.Stock;
	}

	function init() {
		loadProducts();
	}

	$scope.getSalesRange = function () {
		var startDate = '25/12/2015',
			endDate = '26/12/2016';
		var response = salesService.getSalesByRangeDate(startDate, endDate);
		response.then(function (data) {});
	};

	$scope.recoverSale = function () {
		$scope.isSaleFinish = true;
	};

	$scope.goBackToSale = function () {
		$scope.isSaleFinish = false;
	};


	$scope.showModalRecoverSale = function () {
		$scope.invoice.productSales = $scope.productSales;
		$scope.invoice.total = $scope.totalSale;
		$scope.totalRecover = $scope.totalSale;
		$('#modal-recover').modal();
	};

	$scope.updateSubTotal = function (value, product, lasProduct) {		

		if (parseInt(value) > product.StockInitial) {
			alert('Sobrepasa el Stock disponible');
			product.Quantity = lasProduct.Quantity;
		} else {
			product.Total = product.Quantity * product.Price;			

			angular.forEach($scope.products, function (element, index) {
				if (element._id == product._id) {
					element.Stock = product.StockInitial;
					updateProductListStock(product, product.Quantity);
				}
			});
		}
	};

	$scope.saveSale = function () {
		var sale = {
			SubsidiaryId: 12,
			Description: "Venta al credito",
			Total: $scope.totalSale,
			Products: $scope.productSales
		};
		var response = salesService.save(sale);
		response.then(function (data) {

			if (data.isSuccess == true) {
				resetForNewSale();
				toastr.success("Venta Efectuada con exito.");
			} else
				toastr.success("Error al efectuar la venta :(");
		});

	};

	function resetForNewSale() {
		$scope.productSales = [];
		$scope.isSaleFinish = false;
		$scope.searchProduct = '';
		loadProducts();
	}

	$scope.cancelSale = function () {
		$scope.productSales = [];
	};

	$scope.deleteProductSale = function (product) {
		$scope.productSales.remove(product);
		updateProductListStock(product, product.Quantity, true);
	};

	$scope.productSelect = function (product) {
		addorUpdateTableProductSale(product);
	};

	$scope.$watch('productSales', function (newValue, oldValue) {
		$scope.totalSale = $scope.productSales.select(function (product) {
			return product.Total;
		}).sum();
	}, true);

	function addorUpdateTableProductSale(product) {
		var productInList = $scope.productSales.where(function (currentProduct) {
			return currentProduct._id == product._id;
		}).first();

		if (!productInList) {
			product.Quantity = 1;
			$scope.productSales.push(product);
		} else
			productInList.Quantity = parseInt(productInList.Quantity) + 1;

		product.Total = product.Price * product.Quantity;

		updateProductListStock(product, 1);
	}

	function updateProductListStock(product, quantity, isAdd) {
		if (isAdd)
			product.Stock = parseInt(product.Stock) + parseInt(quantity);
		else
			product.Stock = parseInt(product.Stock) - parseInt(quantity);
	}


});