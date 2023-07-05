const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async (email, token) => {
  const { EMAIL_NAME, EMAIL_PASSWORD, URL_CLIENT } = process.env;
  const html = `Please click in link below to change your password. Link will be expired after 15 minutes. <a href="${URL_CLIENT}/api/user/reset-password/${token}">Click here</a>`;
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_NAME,
      pass: EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"danielshop" <no-relply@danielshop.com>',
    to: email,
    subject: 'Forgot Password ✔',
    html: html,
  });

  return info;
});

module.exports = sendMail;
