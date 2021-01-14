const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authService = require('../services/authService');
const userService = require('../services/userService');
const configAuth = require('../config/auth');
const User = require('../models/userModel');

// Normal authentication config
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async function (email, password, done) {
            const user = await authService.checkCredentials(email, password);
            if (!user) {
                return done(null, false, {
                    message: 'Bạn nhập sai tên đăng nhập hoặc mật khẩu'
                });
            }
            if (!user.active) {
                return done(null, false, {
                    message: 'Email chưa được xác thực, vui lòng kiểm tra lại'
                });
            }
            if (user.locked) {
                return done(null, false, {
                    message:
                        'Tài khoản đã bị khóa, vui lòng liên hệ admin để được hỗ trợ'
                });
            }
            return done(null, user);
        }
    )
);

// Google authentication config
passport.use(
    new GoogleStrategy(
        {
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        async function (accessToken, refreshToken, profile, done) {
            process.nextTick(async function () {
                let user = await userService.getUser({
                    'google.id': profile.id
                });
                if (user) return done(null, user);
                user = new User();
                user.google.id = profile.id;
                user.google.token = accessToken;
                user.google.name =
                    profile.name.givenName + ' ' + profile.name.familyName;
                user.google.email = profile.emails[0].value;
                user.name =
                    profile.name.givenName + ' ' + profile.name.familyName;
                user.email = profile.emails[0].value;
                user.avatar = profile.photos[0].value;
                user.active = true;
                await user.save({ validateBeforeSave: false });
                user = await userService.getUser({
                    'google.id': profile.id
                });
                return done(null, user);
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    const user = await userService.getUserById(id);
    done(null, user);
});

module.exports = passport;
