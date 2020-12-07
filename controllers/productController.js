const Product = require('../models/productModel');

exports.topPopularProducts = (req, res, next) => {
    req.query.limit = '5';
    next();
};
exports.getPopularProducts = async(req, res) => {
    let query = Product.find({});
    const limit = req.query.limit;
    if (limit) {
        query = query.limit(~~limit);
    }
    const products = await query;
    res.render('index', { products });
};
exports.getAllProducts = async(req, res) => {
    let query = Product.find({});
    const limit = req.query.limit;
    if (limit) {
        query = query.limit(~~limit);
    }
    const products = await query;
    res.render('shop', { products });
};

exports.getProduct = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('single-product-details', { product });
};


exports.getAccessory = async(req, res) => {
    const product = await Product.findById("5fc8ee3a11043817044c9c24");
    res.render('accessory', { product });
};