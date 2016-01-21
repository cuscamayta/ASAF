'use strict';

var _ = require('lodash');
//var mongoose = require('mongoose');
var Country = require('./country.model');
var parentSchema = require('./parent.model');

// Get list of things
exports.index = function (req, res) {
	var aaron = new Country.Person({ name: 'Aaron', age: 100 });

	aaron.save(function (err) {
		if (err) { console.log(err); };


		for (var i = 0; i <= 10; i++) {
			var story1 = new Country.Story({
				title: "A man who cooked Nintendo" + i.toString()
				, _creator: aaron._id
			});

			saveStory(story1);
		}

		function saveStory(story) {
			story.save(function (err) {
				if (err) { console.log('error'); };
			});
		}
	});

	Country.Story.find(function (err, country) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, country);
	});
	
	//	Country.Story.find(function (err, country) {
	//		if (err) {
	//			return handleError(res, err);
	//		}
	//		return res.json(200, country);
	//	});
};

// Get a single product
exports.show = function (req, res) {
	Country.findById(req.params.id, function (err, country) {
		if (err) {
			return handleError(res, err);
		}
		if (!country) {
			return res.send(404);
		}
		return res.json(country);
	});
};

// Creates a new product in the DB.
exports.create = function (req, res) {

	Country.create(req.body, function (err, product) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, product);
	});
};

// Updates an existing product in the DB.
exports.update = function (req, res) {

	if (req.body._id) {
		delete req.body._id;
	}
	Country.findById(req.params.id, function (err, country) {
		if (err) {
			return handleError(res, err);
		}
		if (!country) {
			return res.send(404);
		}
		var updated = _.merge(country, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, country);
		});
	});
};

// Deletes a product from the DB.
exports.destroy = function (req, res) {
	Country.findById(req.params.id, function (err, country) {
		if (err) {
			return handleError(res, err);
		}
		if (!country) {
			return res.send(404);
		}
		country.remove(function (err) {
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