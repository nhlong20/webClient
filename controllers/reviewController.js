'use strict';
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

exports.createReview = async (req, res) => {
    const productId = req.params.id;
    const { star, title, detail } = req.body;

    if (!star || !title || !detail) {
        req.flash('error', 'Bạn chưa nhập đủ thông tin yêu cầu');
        return res.redirect('/san-pham/' + productId);
    }

    let userId;
    if (req.user) {
        userId = req.user._id;
    } else {
        userId = '5fd6d634985c61001789765b'; //id ảo
    }

    const newReview = {
        user: userId,
        rating: star,
        title,
        review: detail,
        product: productId
    };
    const review = await Review.create(newReview);
    req.flash('success', 'Bạn đã gửi đánh giá cho sản phẩm này thành công');
    return res.redirect('/san-pham/' + productId);
};
exports.updateReview = async (req, res) => {
    const { title, review } = req.body;
    if (!title || !review) {
        return res.status(400).json({
            status: 'error',
            message: 'Thông tin không được để trống!'
        });
    }
    // Update review
    await Review.findOneAndUpdate({ _id: req.params.id }, { title, review });
    const doc = await Product.findById(req.body.productId).populate('reviews');
    res.status(201).json({
        status: 'success',
        message: 'Cập nhật đánh giá thành công',
        reviews: doc.reviews,
        ratingAverage: doc.ratingsAverage,
    });
};

exports.deleteReview = async (req, res) => {
    await Review.findOneAndDelete({ _id: req.params.id });

    const doc = await Product.findById(req.body.productId).populate('reviews');
    res.status(200).json({
        status: 'success',
        message: 'Xóa đánh giá thành công',
        reviews: doc.reviews,
        ratingAverage: doc.ratingsAverage,
        uid: req.user._id
    });
};
