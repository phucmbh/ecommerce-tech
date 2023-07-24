const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ subject, url, reason, email }) => {
  const { EMAIL_NAME, EMAIL_PASSWORD } = process.env;
  const html = `Please click in link below to ${reason}. Link will be expired after 15 minutes. <a href=${url}>Click here</a>`;
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
    subject: `${subject}`,
    html: html,
  });

  return info;
});

module.exports = sendMail;
