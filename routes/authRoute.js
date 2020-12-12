var express = require('express');
var router = express.Router();
const authCtrl = require('./../controllers/authController');
const passport = require('./../passport');

router.route('/login').post(
    passport.authenticate('local', {
        badRequestMessage: "Vui lòng nhập nhập email và mật khẩu để đăng nhập",
        successRedirect: '/',
        failureRedirect: '/dang-nhap',
        failureFlash: true
    })
);

router.route('/signup').post(authCtrl.signup);
router.route('/forgot-password').post(authCtrl.forgotPassword);
router.route('/reset-password/:token').post(authCtrl.resetPassword);


module.exports = router;
