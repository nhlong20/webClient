const Product = require('../models/productModel');

exports.getAllProducts = async (req,res)=>{
 const products = await Product.find({});
 res.render('shop', {products});
}
exports.getProduct = (req,res)=>{
 res.render('single-product-details');
}