'use strict'
const express = require('express');
const productCtrl = require('./../../controllers/productController');

const router = express.Router();

router.get('/products', productCtrl.apiGetBrand);

module.exports = router;
