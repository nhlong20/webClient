const express = require('express');
const productCtrl = require('./../controllers/productController');
const userCtrl = require('./../controllers/userController');
const authCtrl = require('./../controllers/authController');
const AppError = require('./../utils/appError');
const router = express.Router();
/* GET home page. */
router
    .route('/')
    .get(productCtrl.topPopularProducts, productCtrl.getPopularProducts);

router.route('/account/edit').get(authCtrl.isLoggedIn, userCtrl.getProfile);
router.route('/account/password/change').get(authCtrl.isLoggedIn, userCtrl.getProfile);

router.route('/reset-password').get((req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return next(new AppError(`Không tìm thấy trang`, 404));
    }
    res.render('reset-password', { token });
});

router.get('/cart', function (req, res, next) {
    res.render('cart');
});
router.get('/thanh-toan', function (req, res, next) {
    res.render('checkout');
});
router.get('/ve-chung-toi', function (req, res, next) {
    res.render('about');
});
router.get('/lien-he', function (req, res, next) {
    res.render('contact');
});
router.get('/dang-nhap', function (req, res, next) {
    res.render('login');
});
router.get('/dang-ky', function (req, res, next) {
    res.render('register');
});
router.get('/quen-mat-khau', function (req, res, next) {
    res.render('forgot-password');
});
router.get('/tim-kiem', productCtrl.searchProducts);
module.exports = router;
