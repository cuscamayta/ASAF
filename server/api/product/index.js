'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

router.get('/products', controller.index);
router.get('/product/:id', controller.show);
router.post('/product', controller.create);
router.put('/product/:id', controller.update);
router.patch('/product/:id', controller.update);
router.delete('/product/:id', controller.destroy);

module.exports = router;
