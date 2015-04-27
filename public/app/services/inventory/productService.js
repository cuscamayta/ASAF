app.service('productService', ['$http', '$q', function ($http, $q) {

	this.noCache = function () {
		return '?_' + new Date().getTime();
	}

	this.getProducts = function () {
		var defer = $q.defer();
		$http.get('/api/product').success(function (response) {
			defer.resolve(response);
		})
		return defer.promise;
	}

	this.save = function (product) {
		var defer = $q.defer();
		$http.post('/api/product', product).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

	this.edit = function (product) {
		var defer = $q.defer();

		$http.put('/api/product/'.concat(product._id), product).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

	this.remove = function (id) {
		var defer = $q.defer();

		$http.delete('/api/product/'.concat(id)).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

}]);
