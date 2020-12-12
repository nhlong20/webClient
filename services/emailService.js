'use strict';
const nodemailer = require('nodemailer');

module.exports.sendEmail = async options => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME, // sender email
            pass: process.env.EMAIL_PASSWORD // sender email
        }
    });
 
    const mailOptions = {
        from: '"Hoàng Long Nguyễn 👻" <foo@example.com>', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message // plain text body
        // html: "<b>Hello world?</b>", // html body
    };

    // send mail with defined transport options object
    await transporter.sendMail(mailOptions);
};
