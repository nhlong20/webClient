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
exports.getMenWatches = async(req, res) => {
    const products = await Product.find({
        department: 'Watch',
        category: 'Men'
    });
    res.render('shop', { products });
};
exports.getWomenWatches = async(req, res) => {
    const products = await Product.find({
        department: 'Watch',
        category: 'Women'
    });
    res.render('shop', { products });
};
exports.getAccessories = async(req, res) => {
    const products = await Product.find({
        department: 'Accessory',
    });
    res.render('shop', { products });
};

exports.getProduct = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product && product.department == "Accessory") {
        res.render('accessory', { product });
    }
    res.render('single', { product });
};