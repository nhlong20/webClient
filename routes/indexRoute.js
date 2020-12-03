const express = require('express');
const productController = require('./../controllers/productController');

const router = express.Router();

/* GET home page. */
router.route('/').get(productController.topPopularProducts, productController.getPopularProducts);

router.get('/cart', function (req, res, next) {
    res.render('cart');
});
router.get('/checkout', function (req, res, next) {
    res.render('checkout');
});
router.get('/shop', function (req, res, next) {
    res.render('shop');
});
router.get('/about', function (req, res, next) {
    res.render('about');
});
router.get('/contact', function (req, res, next) {
    res.render('contact');
});
router.get('/single-product', function (req, res, next) {
    res.render('single-product');
});

module.exports = router;
