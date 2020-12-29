const express = require('express');
const productCtrl = require('../controllers/productController');
const router = express.Router({ mergeParams: true });

router.route('/').get(productCtrl.getAllWatches);
router.route('/dong-ho-nam').get(productCtrl.getMenWatches);
router.route('/dong-ho-nu').get(productCtrl.getWomenWatches);
router.route('/phu-kien').get(productCtrl.getAccessories);
router.route('/thuong-hieu').get(productCtrl.getBrand);
router.route('/:id').get(productCtrl.getProduct);
router.route('/:id/review').post(productCtrl.createReview);

module.exports = router;