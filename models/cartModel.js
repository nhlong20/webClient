const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Cart must belong to a User!']
    },
    status: {
        type: String,
        enum: ['active', 'unactive']
    },
    total: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        default: 0,
    },
    products: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: [true, 'Review must belong to a tour.']
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

// POST cart qua api

// If user logger in
