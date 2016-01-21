'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var salesSchema = new Schema({	
	DateSale: String,
	Active: Boolean,	
	SubsidiaryId: String,
	Description: String,
	Total: Number
});

var detailSalesSchema = new Schema({
	Quantity: Number,
	Discount: Number,
	PriceSale: Number,
	Active: Boolean,
	SalesId: 0,
	Product: {
		type: Schema.ObjectId,
		ref: 'Product'
	}
});




var models = {
	Sales: mongoose.model('Sales', salesSchema),
	DetailSales: mongoose.model('SalesDetail', detailSalesSchema)
};


module.exports = models; // mongoose.model('Country', countrySchema);