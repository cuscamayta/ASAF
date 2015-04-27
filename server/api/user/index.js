'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
<<<<<<< HEAD
router.post('/:signin',controller.login);
=======
>>>>>>> c88a6951759647e87b874b1e9ee404781fec620e

module.exports = router;
