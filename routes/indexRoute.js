const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/cart', function(req, res, next) {
  res.render('cart');
});
router.get('/checkout', function(req, res, next) {
  res.render('checkout');
});
router.get('/shop', function(req, res, next) {
  res.render('shop');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/single-product', function(req, res, next) {
  res.render('single-product');
});




module.exports = router;
