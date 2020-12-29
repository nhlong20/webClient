'use strict';
const Review = require('../models/reviewModel');

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
    const id = req.params.id;
    const { title, review } = req.body;
    if (!title || !review) {
        return res.status(400).json({
            status: 'error',
            message: 'Thông tin không được để trống!'
        });
    }
    // Update review
    const updatedReview = await Review.findByIdAndUpdate(id, { title, review });

    const reviews = await Review.find({
        product: updatedReview.product
    }).populate({
        path: 'user',
        select: 'name avatar'
    });
    res.status(201).json({
        status: 'success',
        message: 'Bài đánh giá của bạn đã được cập nhật nội dung',
        reviews
    });
};

exports.deleteReview = async (req, res) => {
    const id = req.params.id;
    const review = await Review.findById(id);
    const productID = review.product;
    const userID = review.user._id;

    await review.remove();

    const reviews = await Review.find({ product: productID }).populate({
        path: 'user',
        select: 'name avatar'
    });

    res.status(200).json({
        status: 'success',
        message: 'Bài đánh giá của bạn đã được xóa',
        reviews,
        userID
    });
};
