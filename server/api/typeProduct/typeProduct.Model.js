'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TypeProductSchema = {
	TypeProductId: Schema.ObjectId,
	Name: String,
	Description: String
};

module.exports = mongoose.model('TypeProduct', TypeProductSchema);
