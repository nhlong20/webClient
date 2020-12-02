const fs = require('fs');
let products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`, 'utf-8'));


exports.getAllProducts = (req,res)=>{
 res.render('shop', {products});
}
exports.getProduct = (req,res)=>{
 res.render('single-product-details');
}