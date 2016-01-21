app.service('securityService', ['$http', '$q', function ($http, $q) {

	this.noCache = function () {
		return '?_' + new Date().getTime();
	}


	this.login = function (user) {
		var defer = $q.defer();
		$http.post('/api/user/signin', user).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}
}]);