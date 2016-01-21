'use strict';

var _ = require('lodash');
var Product = require('./test.model');

exports.index = function (req, res) {

	Product.Person.find().populate('teamId').exec(function (err, people) {
		var results = people.map(function (person) {
			res.send({
				name: person.name,
				Team: person.teamId.name
			});
		});
	});
	//	var team = new Product.Team({
	//		name: 'Red Team'
	//	});
	//
	//	team.save(function (err) {
	//		if (err) return handleError(err);
	//
	//		var person = new Product.Person({
	//			name: "Test Name",
	//			teamId: team._id // assign the _id from the person
	//		});
	//
	//		person.save(function (err) {
	//			if (err) return handleError(err);
	//			// thats it!
	//			res.send({'test':'true'});
	//		});
	//	});	
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
	console.log('request');
	console.log(req);
	console.log('response');
	console.log(res);

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