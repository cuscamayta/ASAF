'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var UserSchema = new Schema({
	UserId: Schema.ObjectId,
	Name: String,
	LastName: String,
	EnterDate: Date,
	Role: String
})

module.exports = mongoose.model('User', UserSchema);
