const fs = require('fs');
let {products} = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));


exports.getAllProducts = (req,res)=>{
 console.log('ssssssssssssssssssssssssssss')
 console.log(Array.isArray(products));
 res.render('shop', {products});
}
exports.getProduct = (req,res)=>{
 res.render('single-product-details');
}