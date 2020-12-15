var express = require('express');
var router = express.Router();
const userCtrl = require('./../controllers/userController');
const authCtrl = require('./../controllers/authController');

router.route('/dang-xuat').get(userCtrl.logout);
router.post('/updateAvatar', userCtrl.updateUserAvatar);
router.post('/updateInformation', userCtrl.updateUserInformation);
router.post('/address', userCtrl.updateAddress);
router.post('/history', userCtrl.getOrders);

router.route('/signup').post(authCtrl.signup);
router.route('/forgot-password').post(authCtrl.forgotPassword);
router.route('/reset-password').post(authCtrl.resetPassword);
router.route('/change-password').post(authCtrl.changePassword);

module.exports = router;