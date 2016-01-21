'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String
});

var PersonSchema = new Schema({
    name: String,
    teamId: {
        type: Schema.ObjectId,
        ref: 'Team',
    }
});


var models = {
	Team: mongoose.model('Team', TeamSchema),
	Person: mongoose.model('Person', PersonSchema)
};


module.exports = models;// mongoose.model('Country', countrySchema);
