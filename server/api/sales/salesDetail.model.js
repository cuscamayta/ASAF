'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var salesDetailSchema = new Schema({
	ProductId: String,
	SalesId: String,
	Quantity: Number,
	Discount: Number,
	PriceSale: Number,
	Name: String,
	Description: String
});

module.exports = mongoose.model('SalesDetail', salesDetailSchema);