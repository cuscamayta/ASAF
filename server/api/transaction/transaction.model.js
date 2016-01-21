'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;



var TransactionSchema = new Schema({
	TransactionId: Schema.ObjectId,
	ProductId: String,
	Quantity: String,
	DateTransaction: String,
	Description: String,
	IdLog: Number,
	Status: Boolean
});

module.exports = mongoose.model('Transaction', TransactionSchema);