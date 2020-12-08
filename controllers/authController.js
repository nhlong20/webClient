const User = require('../models/userModel');
exports.login = async (req, res) => {
    const { email, password } = req.body;
    // Check whether email and password exist or not
    if (!email || !password) {
        console.log('Email or password is empty');
    }
    const user = await User.findOne({ email }).select('+password');
    // Check whether user exists && password is correct or not
    if (!user || password != user.password) {
        console.log('Incorrect email or password');
    }
    res.redirect('/user');
};
exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.firstName + req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    console.log(newUser);
    res.redirect('/dang-nhap');
    // Send email after sign up to confirm
};
