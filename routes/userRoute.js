var express = require('express');
var router = express.Router();
const userCtrl = require('./../controllers/userController');

router.route('/').get(userCtrl.getUserProfile);
router.post('/change-information', userCtrl.changeInfo);

module.exports = router;
