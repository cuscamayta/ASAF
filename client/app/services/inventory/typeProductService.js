app.service('typeProductService', ['$http', '$q', function ($http, $q) {

	this.noCache = function () {
		return '?_' + new Date().getTime();
	}

	this.getTypeProducts = function () {
		var defer = $q.defer();
		$http.get('/api/typeProduct').success(function (response) {
			defer.resolve(response);
		})
		return defer.promise;
	}

	this.save = function (typeProduct) {
		var defer = $q.defer();
		$http.post('/api/typeProduct', typeProduct).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

	this.edit = function (typeProduct) {
		var defer = $q.defer();

		$http.put('/api/typeProduct/'.concat(typeProduct._id), typeProduct).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

	this.remove = function (id) {
		var defer = $q.defer();

		$http.delete('/api/typeProduct/'.concat(id)).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

}]);
