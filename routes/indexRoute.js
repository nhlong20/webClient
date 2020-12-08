const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

/* GET home page. */
router.route('/').get(productController.topPopularProducts, productController.getPopularProducts);

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
router.get('/tim-kiem', productController.searchProducts);
module.exports = router;
