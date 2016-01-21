'use strict';

var _ = require('lodash');
var models = require('../common/Schema'),
	User = models.User;

exports.index = function (req, res) {
	User.find(function (err, users) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, users);
	});
};

exports.show = function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return handleError(res, err);
		}
		if (!user) {
			return res.send(404);
		}
		return res.json(user);
	});
};

exports.create = function (req, res) {
	User.create(req.body, function (err, user) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, user);
	});
};

exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return handleError(res, err);
		}
		if (!user) {
			return res.send(404);
		}
		var updated = _.merge(user, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, user);
		});
	});
};

exports.destroy = function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			return handleError(res, err);
		}
		if (!user) {
			return res.send(404);
		}
		user.remove(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.send(204);
		});
	});
};

exports.login = function (req, res) {
	console.log('req');
	console.log(req.body);
	User.find({
		UserName: req.body.UserName,
		Password: req.body.Password
	}, function (err, user) {
		//		if (err) {
		//			return handleError(res, err);
		//		}
		//		if (!user) {
		//			return res.send({
		//				user: null,
		//				code: 404
		//			});
		//		}
		return res.json(user);
	});
};

function handleError(res, err) {
	return res.send(500, err);
}