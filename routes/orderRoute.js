var express = require('express');
var router = express.Router();
const userCtrl = require('./../controllers/userController');
const authCtrl = require('./../controllers/authController');
const orderCtrl = require('./../controllers/orderController')
router.route('/history').get(authCtrl.isLoggedIn, userCtrl.getOrders);
router.route('/').post(authCtrl.isLoggedIn, orderCtrl.createOrder);
module.exports = router;
