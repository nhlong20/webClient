const User = require('../models/userModel');
const authService = require('../services/authService');
const userService = require('../services/userService');

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // 1. Check whether email and password exist or not
//         if (!email || !password) {
//             throw 'Email or password is empty';
//         }
//         const loginUser = await authService.checkCredentials(email, password);
//         // 3) If everything ok, redirect user back to homepage
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//     }
// };
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
