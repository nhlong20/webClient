var express = require('express');
var router = express.Router();
const authCtrl = require('./../controllers/authController');
const passport = require('./../passport');

router.route('/login').post(
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/dang-nhap',
        failureFlash: false
    })
);

router.route('/signup').post(authCtrl.signup);
module.exports = router;
