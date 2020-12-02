const fs = require('fs');
const products = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));


exports.getAllProducts = (req,res)=>{
 console.log("i'm in");
 res.render('shop');
}