'use strict'
const express = require('express');
const cartCtrl = require('../../controllers/cartController');

const router = express.Router();

router.route('/:id').post(cartCtrl.addToCart);
router.route('/:id').delete(cartCtrl.removeItem);
module.exports = router;