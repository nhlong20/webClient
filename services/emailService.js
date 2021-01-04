'use strict';
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = `AWS-OS Support 👻<no-reply@awsos-client.herokuapp.com>`;
    }

    // Create reusable transporter object using the default SMTP transport
    createTransport() {
        if (process.env.NODE_ENV === 'production') {
            // Send Grid
            return 1;
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            service: process.env.EMAIL_SERVICE,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USERNAME, // sender email
                pass: process.env.EMAIL_PASSWORD // sender email
            }
        });
    }

    async send(template, subject) {
        //1. Render HTML based on a ejs template
        const dir = path.join(__dirname, `/../views/email/${template}.ejs`);
        const html = await ejs.renderFile(dir, {
            name: this.name,
            url: this.url,
            subject
        });
        //2. Define email options
        const mailOptions = {
            from: this.from, // sender address
            to: this.to, // list of receivers
            subject: subject, // Subject line
            // text: options.message, // plain text body
            html // html body
        };
        //3. Told the transporter send the email
        this.createTransport().sendMail(mailOptions);
    }
    async sendVerify() {
        await this.send('verifyEmail', 'Xác thực địa chỉ email');
    }
    async sendResetPassword() {
        await this.send('resetPassword', 'Đặt lại mật khẩu');
    }
};
