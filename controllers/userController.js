const User = require('../models/userModel');
const path = require('path');
var fs = require('fs');
const formidable = require('formidable');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.getUserProfile = async (req, res, next) => {
    let user = req.user;
    res.render('profile', { user });
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
            { _id: '5fd351d791dc080898e62e79' },
            { avatar: uploadedRes.secure_url }
        );
        // fs.unlinkSync(uploadedPath);
        console.log('Uploaded product successfully');
        res.redirect('/profile');
    });
};
