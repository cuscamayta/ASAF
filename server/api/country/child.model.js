'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var childSchema = new Schema({
	name: 'string'
});


module.exports = mongoose.model('child', childSchema);