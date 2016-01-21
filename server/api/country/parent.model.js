'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var childSchema = new Schema({
	name: 'string'
});

var parentSchema = new Schema({
	children: [childSchema]
});
var Parent = mongoose.model('Parent', parentSchema);

function init() {

	console.log('saveando parent');
	var parent = new Parent({
		children: [{
			name: 'Matt'
		}, {
			name: 'Sarah'
		}]
	});
	parent.children[0].name = 'Matthew';
	parent.save(callback);
}

function callback(e) {
	console.log('e');
	console.log(e);
}

init();
//saveParent();

module.exports = Parent; // mongoose.model('parent', parentSchema);