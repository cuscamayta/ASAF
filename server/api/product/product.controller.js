'use strict';

var _ = require('lodash');
var Product = require('./product.model');

exports.index = function (req, res) {
	Product.find(function (err, products) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, products);
	});
};

exports.show = function (req, res) {
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			return handleError(res, err);
		}
		if (!product) {
			return res.send(404);
		}
		return res.json(product);
	});
};

exports.create = function (req, res) {
	Product.create(req.body, function (err, product) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, product);
	});
};

exports.update = function (req, res) {
<<<<<<< HEAD
	console.log('request');
	console.log(req);
	console.log('response');
	console.log(res);

=======
>>>>>>> c88a6951759647e87b874b1e9ee404781fec620e
	if (req.body._id) {
		delete req.body._id;
	}
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			return handleError(res, err);
		}
		if (!product) {
			return res.send(404);
		}
		var updated = _.merge(product, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, product);
		});
	});
};

exports.destroy = function (req, res) {
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			return handleError(res, err);
		}
		if (!product) {
			return res.send(404);
		}
		product.remove(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
