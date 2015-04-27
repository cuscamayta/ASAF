'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

<<<<<<< HEAD
var userRole = {
	Name: String,
	Description: String
}
=======
>>>>>>> c88a6951759647e87b874b1e9ee404781fec620e

var UserSchema = new Schema({
	UserId: Schema.ObjectId,
	Name: String,
	LastName: String,
<<<<<<< HEAD
	EnterDate: String,
	Role: userRole,
	UserName: String,
	Password: String
=======
	EnterDate: Date,
	Role: String
>>>>>>> c88a6951759647e87b874b1e9ee404781fec620e
})

module.exports = mongoose.model('User', UserSchema);
