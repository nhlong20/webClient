const User = require('../models/userModel');
const path = require('path');
var fs = require('fs');
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

exports.getProfile = async (req, res, next) => {
    let user = req.user;
    const pageType = req.originalUrl;
    res.render('profile', { user, pageType });
};
exports.apiGetProfile = async (req, res) => {
    const html = await ejs.renderFile(baseDir + 'ajax_user.ejs', {
        user: req.user
    });
    res.json(html);
};
exports.updateUser = async (req, res) => {
    const form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '/../uploads');
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10MB
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return;
        }
        const uploadedPath = files.images.path;
        const uploadedRes = await cloudinary.uploader.upload(uploadedPath);
        let user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { avatar: uploadedRes.secure_url }
        );
        // fs.unlinkSync(uploadedPath);
        console.log('Uploaded product successfully');
        res.redirect('/profile');
    });
};
