'use strict';
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
exports.addToCart = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).select("name brand size price coverImage _id");
    if (!product) return;
    if (!req.session.cart) {
        req.session.cart = {
            items: {},
            totalQty: 0,
            totalPrice: 0
        };
    }
    let cart = req.session.cart;
    // Check if item does not exist in cart
    if (!cart.items[req.params.id]) {
        cart.items[req.params.id] = {
            item: product,
            qty: 1
        };
        cart.totalQty += 1;
        cart.totalPrice = cart.totalPrice + product.price;
    } else {
        cart.items[req.params.id].qty += 1;
        cart.totalQty += 1;
        cart.totalPrice = cart.totalPrice + product.price;
    }

    res.status(200).json({
     cart
    });
};
