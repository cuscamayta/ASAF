app.service('userService', ['$http', '$q', function ($http, $q) {

	this.noCache = function () {
		return '?_' + new Date().getTime();
	}

	this.getUsers = function () {
		var defer = $q.defer();
		$http.get('/api/user').success(function (response) {
			defer.resolve(response);
		})
		return defer.promise;
	}

	this.save = function (user) {
		var defer = $q.defer();
		$http.post('/api/user', user).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

	this.edit = function (user) {
		var defer = $q.defer();

		$http.put('/api/user/'.concat(user._id), user).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

	this.remove = function (id) {
		var defer = $q.defer();

		$http.delete('/api/user/'.concat(id)).success(function (response) {
			defer.resolve(response);
		});
		return defer.promise;
	}

}]);
