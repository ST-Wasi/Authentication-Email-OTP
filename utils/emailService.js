const nodemailer = require('nodemailer');
const dotenv = require("dotenv").config();

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_APP_PASSWORD);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Authentication',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Authentication OTP</h2>
                    <p style="color: #666; font-size: 16px;">Hello,</p>
                    <p style="color: #666; font-size: 16px;">Your OTP for authentication is:</p>
                    <div style="background-color: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #333; margin: 0; letter-spacing: 5px;">${otp}</h1>
                    </div>
                    <p style="color: #666; font-size: 14px;">This OTP will expire in 10 minutes.</p>
                    <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #999; font-size: 12px;">This is an automated email. Please do not reply.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = { sendOTPEmail }; 