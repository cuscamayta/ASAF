app.service('salesService', function ($http, $q) {

	this.save = function (sale) {
		var defer = $q.defer();
		$http.post('/api/sale', sale).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	};

	this.getSales = function () {
		var defer = $q.defer();
		$http.get('/api/sale').success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	};

	this.getSalesByRangeDate = function (startDate, endDate) {
		var defer = $q.defer();
		$http.post('/api/sale/productomasvendido', { startDate: startDate, endDate: endDate }).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	};

});
