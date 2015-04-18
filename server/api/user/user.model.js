'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var ProductSchema = new Schema({
	Name: Schema.ObjectId,
	LastName: String,
	EnterDate: String,
	Role: String
})

module.exports = mongoose.model('User', UserSchema);
