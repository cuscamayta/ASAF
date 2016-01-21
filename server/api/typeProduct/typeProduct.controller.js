'use strict';
//var Product = require('./product.model');
var _ = require('lodash');
var models = require('../common/Schema'),
	TypeProduct = models.TypeProduct;

exports.index = function (req, res) {
	TypeProduct.find(function (err, typeProducts) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, typeProducts);
	});
};

exports.show = function (req, res) {
	TypeProduct.findById(req.params.id, function (err, typeProduct) {
		if (err) {
			return handleError(res, err);
		}
		if (!typeProduct) {
			return res.send(404);
		}
		return res.json(typeProduct);
	});
};

exports.create = function (req, res) {
	TypeProduct.create(req.body, function (err, typeProduct) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, typeProduct);
	});
};

exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	TypeProduct.findById(req.params.id, function (err, typeProduct) {
		if (err) {
			return handleError(res, err);
		}
		if (!typeProduct) {
			return res.send(404);
		}
		var updated = _.merge(typeProduct, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, typeProduct);
		});
	});
};

exports.destroy = function (req, res) {
	TypeProduct.findById(req.params.id, function (err, typeProduct) {
		if (err) {
			return handleError(res, err);
		}
		if (!typeProduct) {
			return res.send(404);
		}
		typeProduct.remove(function (err) {
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