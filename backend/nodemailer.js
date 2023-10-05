require('dotenv').config();
export const { OUR_EMAIL, OUR_EMAIL_PASS } = process.env;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: OUR_EMAIL,
    pass: OUR_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailer = (message) => {
  console.log(message);
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent: '), info;
  });
};

module.exports = mailer;
