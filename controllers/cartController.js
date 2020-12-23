'use strict';
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
exports.addToCart = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).select(
        'name brand size price coverImage _id'
    );
    if (!product)
        return res
            .status(400)
            .json({ status: 'fail', message: 'Produt not found' });
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
        status: 'success',
        cart
    });
};

exports.removeItem = async (req, res, next) => {
    console.log('ssssssssssssssssssss');
    const productId = req.params.id;
    if (!req.session.cart) {
        return res.status(400).json({
            status: 'fail',
            message: 'Cart is not exist'
        });
    }
    let cart = req.session.cart;
    const currentItem = cart.items[productId];
    if (!currentItem) {
        return res.status(400).json({
            status: 'fail',
            message: 'The item is not in the cart'
        });
    }
    console.log(cart);
    cart.totalQty -= currentItem.qty;
    cart.totalPrice -= currentItem.item.price * currentItem.qty;
    delete cart.items[productId];
    res.status(200).json({
        status: 'success',
        cart
    });
};
