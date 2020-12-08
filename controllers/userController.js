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

exports.getUserProfile = async(req, res, next) => {
    let user = await User.findById("5fcef6e138e0b6cd47a3d49a");
    res.render('user', { user });
};

exports.changeInfo = async(req, res) => {
    //var product = req.body.product;
    //console.log(product);
    console.log("--++++++++++++++++++++++++++++++++++++++++++++++");
    const form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '/../uploads');
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10MB
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return;
        }
        console.log(files)
        const uploadedPath = files.images.path;
        const uploadedRes = await cloudinary.uploader.upload(uploadedPath);
        let user = await User.findOneAndUpdate({ _id: "5fcef6e138e0b6cd47a3d49a" }, { coverImage: uploadedRes.secure_url });

        fs.unlink(uploadedPath, function(err) {
            if (err) throw err;
            console.log('File deleted!');
        });
        console.log('Uploaded product successfully');
        res.redirect('/user');
    });
};