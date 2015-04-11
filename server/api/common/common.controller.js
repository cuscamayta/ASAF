'use strict';


//var Country = require('./country.model');



var path = require("path");

//console.log(path.join(__dirname, '..', '..', model));

var _ = require('lodash'),
    Model =require(path.join(__dirname, '..', '/country/country.model'));// {};

function handleError(res, err) {
    return res.send(500, err);
}


exports.init = function (model) {
    debugger;
    console.log(path.join(__dirname, '..', '/country/country.model'));
    Model = require(path.join(__dirname, '..', '/country/country.model'));
};

exports.index = function (req, res) {
    Model.find(function (err, entities) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, entities);
    });
};
exports.show = function (req, res) {
    Model.findById(req.params.id, function (err, entity) {
        if (err) {
            return handleError(res, err);
        }
        if (!entity) {
            return res.send(404);
        }
        return res.json(entity);
    });
};
exports.create = function (req, res) {
    Model.create(req.body, function (err, entity) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, entity);
    });
};
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Model.findById(req.params.id, function (err, entity) {
        if (err) {
            return handleError(res, err);
        }
        if (!entity) {
            return res.send(404);
        }
        var updated = _.merge(entity, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, entity);
        });
    });
};

exports.destroy = function (req, res) {
    Model.findById(req.params.id, function (err, entity) {
        if (err) {
            return handleError(res, err);
        }
        if (!entity) {
            return res.send(404);
        }
        entity.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};


// Get list of things
//exports.index = function (req, res) {
//	Country.find(function (err, products) {
//		if (err) {
//			return handleError(res, err);
//		}
//		return res.json(200, products);
//	});
//};

// Get a single product
//exports.show = function (req, res) {
//	Country.findById(req.params.id, function (err, product) {
//		if (err) {
//			return handleError(res, err);
//		}
//		if (!product) {
//			return res.send(404);
//		}
//		return res.json(product);
//	});
//};

// Creates a new product in the DB.
//exports.create = function (req, res) {
//	Country.create(req.body, function (err, product) {
//		if (err) {
//			return handleError(res, err);
//		}
//		return res.json(201, product);
//	});
//};

// Updates an existing product in the DB.
//exports.update = function (req, res) {
//	if (req.body._id) {
//		delete req.body._id;
//	}
//	Product.findById(req.params.id, function (err, country) {
//		if (err) {
//			return handleError(res, err);
//		}
//		if (!country) {
//			return res.send(404);
//		}
//		var updated = _.merge(country, req.body);
//		updated.save(function (err) {
//			if (err) {
//				return handleError(res, err);
//			}
//			return res.json(200, country);
//		});
//	});
//};

// Deletes a product from the DB.
//exports.destroy = function (req, res) {
//	Country.findById(req.params.id, function (err, country) {
//		if (err) {
//			return handleError(res, err);
//		}
//		if (!country) {
//			return res.send(404);
//		}
//		country.remove(function (err) {
//			if (err) {
//				return handleError(res, err);
//			}
//			return res.send(204);
//		});
//	});
//};

//function handleError(res, err) {
//	return res.send(500, err);
//}
