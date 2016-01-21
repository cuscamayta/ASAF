var express = require('express'),
	app = express();

var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ASAF', function () {
	console.log('Conected to DB ASAF success !!');
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.listen(7000, function () {
	console.log('servidor iniciario en el puerto 7000');
});

require('./routes')(app);

exports = module.exports = app;