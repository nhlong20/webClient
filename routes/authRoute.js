var express = require('express');
var router = express.Router();
const passport = require('./../passport');
const authCtrl = require('./../controllers/authController');

router.route('/login').post( (req, res) =>
    passport.authenticate('local', {
        badRequestMessage: 'Vui lòng nhập nhập email và mật khẩu để đăng nhập',
        successRedirect: req.session.returnUrl || '/',
        failureRedirect: '/dang-nhap',
        failureFlash: true
    })(req, res)
);
router
    .route('/google')
    .get(passport.authenticate('google', { scope:  ['profile', 'email']  }));

router.route('/google/callback').get(
    passport.authenticate('google', {
        failureRedirect: '/dang-nhap',
        successRedirect: '/'
    })
);
router.route('/verify-email').get(authCtrl.verifyEmail);

module.exports = router;
