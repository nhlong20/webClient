var express = require('express');
var router = express.Router();
const userCtrl = require('./../controllers/userController');
const authCtrl = require('./../controllers/authController');

router.route('/dang-xuat').get(userCtrl.logout);
router.post('/update', userCtrl.updateUser);

router.route('/signup').post(authCtrl.signup);
router.route('/forgot-password').post(authCtrl.forgotPassword);
router.route('/reset-password').post(authCtrl.resetPassword);

module.exports = router;
