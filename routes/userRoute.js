var express = require('express');
var router = express.Router();
const userCtrl = require('./../controllers/userController');

router.route('/dang-xuat').get(userCtrl.logout);
router.post('/update', userCtrl.updateUser);

module.exports = router;
