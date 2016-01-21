'use strict';

var _ = require('lodash');
var q = require('q');
var model = require('../common/Schema');


exports.index = function (req, res) {
	model.Sales.find().populate('Details').exec(function (err, sales) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, sales);
	});
};

exports.salesInRange = function (req, res) {
	model.Sales.find({ "DateSale": { '$gte': new Date(req.body.startDate), '$lt': new Date(req.body.endDate) } }).populate('Details').populate('Product').exec(function (err, sales) {
		if (err)
			return handleError(res, err);
		res.send(200, sales);
	});
};

exports.show = function (req, res) {
	model.Sales.findById(req.params.id, function (err, sale) {
		if (err) {
			return handleError(res, err);
		}
		if (!sale) {
			return res.send(404);
		}
		return res.json(sale);
	});
};

exports.create = function (req, res) {

	var sale = new model.Sales({
		DateSale: new Date().toString(),
		Active: true,
		SubsidiaryId: req.body.SubsidiaryId,
		Description: req.body.Description,
		Total: req.body.Total
	});

	var products = req.body.Products;
	for (var i = 0; i <= products.length - 1; i++) {
		var currentProductDetail = products[i];
		var detailSale = new model.DetailSales({
			Quantity: currentProductDetail.Quantity,
			Discount: currentProductDetail.Discount,
			PriceSale: currentProductDetail.Price,
			Active: true,
			SalesId: sale._id,
			Product: currentProductDetail._id
		});
		sale.Details.push(detailSale._id);
		saveDetail(detailSale);
	}

	function saveDetail(detailSale) {
		detailSale.save(function (err) {
			if (err)
				return handleError(res, err);
			createAndUpdateTransaction(detailSale);
		});
	}

	sale.save(function (err) {
		if (err)
			return handleError(res, err);
		res.send(200, { data: sale, isSuccess: true });
	});

	function createAndUpdateTransaction(detailSale) {
		var transaction = new model.Transaction({
			ProductId: detailSale.Product,
			Quantity: detailSale.Quantity,
			DateTransaction: new Date().toDateString(),
			Description: 'outcome from Sales',
			Income: false,
			IdLog: 1,
			Status: true
		});

		transaction.save(function (err) {
			if (err) return handleError(err);
			model.Product.findById(detailSale.Product, function (err, product) {
				product.ProductTransactions.push(transaction._id);
				product.save(function (err) {
					console.log('saveo producto');
				});
			});

		});

	}

};







exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	model.Sales.findById(req.params.id, function (err, sale) {
		if (err) {
			return handleError(res, err);
		}
		if (!sale) {
			return res.send(404);
		}
		var updated = _.merge(sale, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, sale);
		});
	});
};

exports.destroy = function (req, res) {
	model.Sales.findById(req.params.id, function (err, sale) {
		if (err) {
			return handleError(res, err);
		}
		if (!sale) {
			return res.send(404);
		}
		sale.remove(function (err) {
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