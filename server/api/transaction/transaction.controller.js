'use strict';

var _ = require('lodash');
var models = require('../common/Schema'),
	Transaction = models.Transaction,
	Product = models.Product;

exports.index = function (req, res) {
	Product.find().populate('ProductTransactions').exec(function (err, productsTransactions) {
		if (err)
			return handleError(res, err);

		return res.json(200, productsTransactions);
	});
};

exports.show = function (req, res) {
	Transaction.findById(req.params.id, function (err, transaction) {
		if (err) {
			return handleError(res, err);
		}
		if (!transaction) {
			return res.send(404);
		}
		return res.json(transaction);
	});
};

exports.create = function (req, res) {	
	var transaction = new models.Transaction(req.body);

	transaction.save(function (err) {
		if (err) return handleError(err);
		Product.findById(req.body.ProductId, function (err, product) {
			if (err) {
				return handleError(res, err);
			}
			if (!product) {
				return res.send(404);
			}
			product.ProductTransactions.push(transaction._id);
			product.save(function (err) {
				res.send(200, product);
			});
			//			return res.json(transaction);
		});

	});

	//	Transaction.create(req.body.Transaction, function (err, transaction) {
	//		if (err) {
	//			return handleError(res, err);
	//		
	//				
	//			var person = new Product.Person({
	//				name: "Test Name",
	//				teamId: team._id // assign the _id from the person
	//			});
	//	
	//			person.save(function (err) {
	//				if (err) return handleError(err);
	//				// thats it!
	//				res.send({'test':'true'});
	//			});
	//		return res.json(201, transaction);
	//	});
};

exports.update = function (req, res) {
	console.log('request');

	if (req.body._id) {
		delete req.body._id;
	}
	Transaction.findById(req.params.id, function (err, transaction) {
		if (err) {
			return handleError(res, err);
		}
		if (!transaction) {
			return res.send(404);
		}
		var updated = _.merge(transaction, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, transaction);
		});
	});
};

exports.destroy = function (req, res) {
	Transaction.findById(req.params.id, function (err, transaction) {
		if (err) {
			return handleError(res, err);
		}
		if (!transaction) {
			return res.send(404);
		}
		transaction.remove(function (err) {
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