var express = require('express');
var router = express.Router();
const authCtrl = require('./../controllers/authController');
const userCtrl = require('./../controllers/userController');

router.post('/dang-nhap', authCtrl.login);

router.post('/dang-ky', authCtrl.signup);
router.route('/').get(userCtrl.getUserProfile);
router.post('/change-information', userCtrl.changeInfo);

module.exports = router;
