var express = require('express');
var router = express.Router();
const passport = require('./../passport');

router.route('/login').post(
    passport.authenticate('local', {
        badRequestMessage: "Vui lòng nhập nhập email và mật khẩu để đăng nhập",
        successRedirect: '/',
        failureRedirect: '/dang-nhap',
        failureFlash: true
    })
);



module.exports = router;
