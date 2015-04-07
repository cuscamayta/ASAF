'use strict';

var express = require('express');
var controller = require('./country.controller');

var router = express.Router();

router.get('/country', controller.index);
router.get('/country/:id', controller.show);
router.post('/country', controller.create);
router.put('/country/:id', controller.update);
router.patch('/country/:id', controller.update);
router.delete('/country/:id', controller.destroy);

module.exports = router;
