var express = require('express');
var router = express.Router();
const userCtrl = require('./../controllers/userController');
const authCtrl = require('./../controllers/authController');

router.route('/history').get(authCtrl.isLoggedIn, userCtrl.getOrders);

module.exports = router;
