var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/ASAF', function () {
//	console.log('Conected to DB ASAF success !!');
//});
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {

  response.sendfile('./index.html');

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

require('./routes')(app);

exports = module.exports = app;
