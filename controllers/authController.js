const User = require('../models/userModel');
const authService = require('../services/authService');
const userService = require('../services/userService');

exports.signup = async (req, res, next) => {
    const newUser = {
        name: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    };

    await userService.createUser(newUser);

    res.redirect('/dang-nhap');
    // Send email after sign up to confirm
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Bạn cần đăng nhập trước để tiếp tục');
    res.redirect('/dang-nhap');
};
