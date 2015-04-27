'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var countrySchema = new Schema({
	Name: String,
	Description: String
});

//var price = new Schema({
//    product: productSchema,
//    dateProductPrice: Date,
//    price: Number
//});
//



module.exports = mongoose.model('Country', countrySchema);
