const User = require('../models/userModel');
const Order = require('../models/orderModel');
const path = require('path');
const ejs = require('ejs');

const formidable = require('formidable');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const baseDir = __dirname + '/../views/api/';

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.getUserInfo = async(req, res, next) => {
    const pageType = "userInfo";
    res.render('profile', {pageType});
};
exports.getChangePassword = async(req, res, next) => {
    const pageType = "changePassword";
    res.render('profile', {pageType});
};
exports.getShippingAdress = async(req, res, next) => {
     const pageType = "address";
    res.render('profile', {pageType});
};

exports.getOrders = async(req, res) => {
    let user = req.user;
    const orders = await Order.find({ user: user._id });
    const pageType = 'orders';
    res.render('profile', { orders, pageType });
};

exports.apiGetProfile = async(req, res) => {
    const html = await ejs.renderFile(baseDir + 'ajax_user.ejs', {
        user: req.user
    });
    res.json(html);
};
exports.updateUserAvatar = async(req, res) => {
    const form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '/../uploads');
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10MB
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return;
        }
        const uploadedPath = files.images.path;
        const uploadedRes = await cloudinary.uploader.upload(uploadedPath);
        let user = await User.findOneAndUpdate({ _id: req.user._id }, { avatar: uploadedRes.secure_url });
        // fs.unlinkSync(uploadedPath);
        console.log('Uploaded Avatar successfully');
        res.redirect('/account/edit');
    });
};
exports.updateUserInformation = async(req, res) => {
    try {
        // Get user from db
        const user = await User.findById(req.user._id);
        // Update information
        user.name = req.body.name;
        user.phoneNumber = req.body.phoneNumber;
        user.gender = req.body.gender;

        await user.save({ validateBeforeSave: false });;

        //Redirect user
        req.flash('success', 'Thông tin của bạn đã được cập nhật thành công');
        res.redirect('/account/edit');
    } catch (error) {
        const errorMsg = error.message.split(':').pop();
        req.flash('error', errorMsg);
        res.redirect('/account/edit');
    }
    console.log('Change information successfully');
    res.redirect('/account/edit');
}
exports.updateAddress = async(req, res) => {
    try {
        // Get user from db
        const user = await User.findById(req.user._id);
        // Update information
        user.address = req.body.address;

        await user.save({ validateBeforeSave: false });;

        //Redirect user
        req.flash('success', 'Thông tin địa chỉ đã được cập nhật thành công');
        res.redirect('/account/address');
    } catch (error) {
        const errorMsg = error.message.split(':').pop();
        req.flash('error', errorMsg);
        res.redirect('/account/address');
    }
    res.redirect('/account/address');
}