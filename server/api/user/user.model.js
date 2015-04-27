'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userRole = {
	Name: String,
	Description: String
}

var UserSchema = new Schema({
	UserId: Schema.ObjectId,
	Name: String,
	LastName: String,
	EnterDate: String,
	Role: userRole,
	UserName: String,
	Password: String
})

module.exports = mongoose.model('User', UserSchema);
