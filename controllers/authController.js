'use strict';
const crypto = require('crypto');

const User = require('../models/userModel');
const authService = require('../services/authService');
const userService = require('../services/userService');
const { sendEmail } = require('../services/emailService');
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
exports.forgotPassword = async (req, res) => {
    //Get posted email
    const user = await userService.getUser({ email: req.body.email });
    if (!user) {
        req.flash('error', 'Email chưa được đăng ký, vui lòng kiểm tra lại');
        return res.redirect('/quen-mat-khau');
    }
    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); // turn off all validator defined in userSchema

    //Send Email to User
    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/reset-password?token=${resetToken}`;
    const message = `Click to set new password: ${resetURL}`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Reset your AWS-OS password`,
            message
        });
        req.flash(
            'success',
            'Email đã được gửi, vui lòng kiểm tra hộp thư để cập nhật thông tin.'
        );
        res.redirect('/quen-mat-khau');
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false }); // turn off all validator defined in userSchema
        req.flash(
            'error',
            'Có lỗi trong quá trình gửi email, vui lòng thử lại'
        );
        res.redirect('/quen-mat-khau');
    }
};
exports.resetPassword = async (req, res) => {
    // Get user token
    const plainToken = req.query.token;
    console.log(plainToken);
    const hashToken = crypto
        .createHash('sha256')
        .update(plainToken)
        .digest('hex');
    // Check expire time of token, Compare token to token in db, set new password
    const user = await userService.getUser({
        passwordResetToken: hashToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
        req.flash(
            'error',
            'Token không hợp lệ hoặc đã hết hạn, vui lòng kiểm tra lại'
        );
        return res.redirect('/dang-nhap');
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Redirect user to login page
    req.flash('success', 'Cập nhật mật khẩu thành công, đăng nhập để tiếp tục');
    res.redirect('/dang-nhap');
};

// Middleware
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Bạn cần đăng nhập trước để tiếp tục');
    res.redirect('/dang-nhap');
};
