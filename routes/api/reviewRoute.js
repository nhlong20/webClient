'use strict'
const express = require('express');
const reviewCtrl = require('../../controllers/reviewController');
const router = express.Router({ mergeParams: true });
// UPDATE review
router.route('/:id').patch(reviewCtrl.updateReview);
// DELETE review
router.route('/:id').delete(reviewCtrl.deleteReview);
module.exports = router;