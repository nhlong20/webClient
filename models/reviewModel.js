const mongoose = require('mongoose');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a tour.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    },

}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;