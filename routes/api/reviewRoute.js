'use strict'
const express = require('express');
const productCtrl = require('../../controllers/productController');
const reviewCtrl = require('../../controllers/reviewController');

const router = express.Router();

router.route('/:id').patch(reviewCtrl.updateReview);

router.route('/:id').delete(reviewCtrl.deleteReview);
module.exports = router;