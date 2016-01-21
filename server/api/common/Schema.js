'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var TypeProductSchema = new Schema({
	TypeProductId: Schema.ObjectId,
	Name: String,
	Description: String
});



var ProductSchema = new Schema({
	ProductId: Schema.ObjectId,
	Name: String,
	Description: String,
	Code: String,
	Price: Number,
	ProductType: {
		type: Schema.ObjectId,
		ref: 'TypeProduct'
	},
	ProductTransactions: [{
		type: Schema.ObjectId,
		ref: 'Transaction'
	}]
});



var TransactionSchema = new Schema({
	TransactionId: Schema.ObjectId,
	ProductId: {
		type: Schema.ObjectId,
		ref: 'Product'
	},
	Quantity: Number,
	DateTransaction: String,
	Description: String,
	Income: Boolean,
	IdLog: Number,
	Status: Boolean
});


var userRole = {
	Name: String,
	Description: String
};

var UserSchema = new Schema({
	UserId: Schema.ObjectId,
	Name: String,
	LastName: String,
	EnterDate: String,
	Role: userRole,
	UserName: String,
	Password: String
});

var SalesDetailSchema = new Schema({
	Quantity: Number,
	Discount: Number,
	PriceSale: Number,
	Active: Boolean,
	SalesId: {
		type: Schema.ObjectId,
		ref: 'sales'
	},
	Product: {
		type: Schema.ObjectId,
		ref: 'Product'
	}
});

var SalesSchema = new Schema({
	DateSale: { type: Date, default: Date.now },//String,
	Active: Boolean,
	SubsidiaryId: String,
	Description: String,
	Total: Number,
	Details: [{
		type: Schema.ObjectId,
		ref: 'SalesDetail'
	}]

});



var models = {
	TypeProduct: mongoose.model('TypeProduct', TypeProductSchema),
	Product: mongoose.model('Product', ProductSchema),
	Transaction: mongoose.model('Transaction', TransactionSchema),
	User: mongoose.model('User', UserSchema),
	Sales: mongoose.model('Sales', SalesSchema),
	DetailSales: mongoose.model('SalesDetail', SalesDetailSchema)
};

module.exports = models;