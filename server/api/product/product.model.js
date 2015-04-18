'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var productType = {
	Name: String,
	Description: String
};


var ProductSchema = new Schema({
	ProductId: Schema.ObjectId,
	Name: String,
	Description: String,
	Code: String,
	ProductType: productType
})

module.exports = mongoose.model('Product', ProductSchema);
