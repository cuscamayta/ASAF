'use strict';

module.exports = function (app) {
	//app.use('/api/country', require('./server/api/country'));
	app.use('/api/test', require('./server/api/test'));
	app.use('/api/product', require('./server/api/product'));
	app.use('/api/typeProduct', require('./server/api/typeProduct'));
	app.use('/api/user', require('./server/api/user'));
	app.use('/api/sale', require('./server/api/sales'));
	app.use('/api/transaction', require('./server/api/transaction'));

	app.route('/*')
		.get(function (req, res) {
		res.sendFile(__dirname + '/index.html');
	});
};