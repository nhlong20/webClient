'use strict'
const express = require('express');
const cartCtrl = require('../../controllers/cartController');
const userCtrl = require('../../controllers/userController');

const router = express.Router();

router.route('/:id').post(cartCtrl.addToCart)
module.exports = router;