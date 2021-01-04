const express = require('express');
const productCtrl = require('./../controllers/productController');
const userCtrl = require('./../controllers/userController');
const orderCtrl = require('./../controllers/orderController');
const authCtrl = require('./../controllers/authController');
const AppError = require('./../utils/appError');
const router = express.Router();
/* GET home page. */
router
    .route('/')
    .get(productCtrl.topPopularProducts, productCtrl.getPopularProducts);

router.route('/account/edit').get(authCtrl.isLoggedIn, userCtrl.getUserInfo);
router
    .route('/account/password/change')
    .get(authCtrl.isLoggedIn, userCtrl.getChangePassword);
router
    .route('/account/address')
    .get(authCtrl.isLoggedIn, userCtrl.getShippingAdress);

router.route('/reset-password').get((req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return next(new AppError(`Không tìm thấy trang`, 404));
    }
    res.render('user/reset-password', { token });
});

router.route('/thanh-toan').get(authCtrl.isLoggedIn, orderCtrl.getCheckOut);

router.get('/ve-chung-toi', function (req, res, next) {
    res.render('about');
});
router.get('/lien-he', function (req, res, next) {
    res.render('contact');
});
router.get('/dang-nhap', authCtrl.isGuest, function (req, res, next) {
    res.render('user/login');
});
router.get('/dang-ky', authCtrl.isGuest, function (req, res, next) {
    res.render('user/register');
});
router.get('/quen-mat-khau', function (req, res, next) {
    res.render('user/forgot-password');
});
router.get('/tim-kiem', productCtrl.searchProducts);
module.exports = router;
