const express = require('express');
const productCtrl = require('../controllers/productController');
const router = express.Router();


router.route('/').get(productCtrl.getAllProducts);
router.route('/dong-ho-nam').get(productCtrl.getMenWatches);
router.route('/dong-ho-nu').get(productCtrl.getWomenWatches);
router.route('/phu-kien').get(productCtrl.getAccessories);
router.route('/thuong-hieu').get(productCtrl.getBrand);
router.route('/:id').get(productCtrl.getProduct);
module.exports = router;