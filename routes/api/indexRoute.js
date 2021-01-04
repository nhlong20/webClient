'use strict'
const express = require('express');
const productCtrl = require('../../controllers/productController');
const userCtrl = require('../../controllers/userController');

const router = express.Router();
router.route('/products').get(productCtrl.apiFilterProduct);
router.route('/password/change').get(userCtrl.apiGetProfile);
module.exports = router;