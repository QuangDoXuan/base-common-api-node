
const nodemailer = require("nodemailer");
import config from '../config';

const transporter = nodemailer.createTransport({
  host: config.emailOption.serverMail,
  port: config.emailOption.serverPort,
  secure: false,
  auth: {
    user: config.emailOption.authUser,
    pass: config.emailOption.authPass
  }
});


interface sendMailData {
  to: string | string[],
  subject: string,
  html: string,
  cc?: string[],
  bcc?: string[]
}

interface CCOptionnal {
  
}

export const sendMail = async (mailOption: sendMailData) => {
  const option = {
    from: config.emailOption.authUser, // sender address
    to: mailOption.to, // list of receivers
    subject: mailOption.subject,
    html: mailOption.html,
    cc:mailOption.cc,
    bcc: mailOption.bcc
  }

  return transporter.sendMail(option);
};

export function notifyDevelop (to: string, subject: string, body: string, cc?: string[]) {
  body += `<p> environment:${process.env.NODE_ENV}</p>`;
  const mailOptions = {
    from: "demo.amela@gmail.com",
    to: to,
    subject: subject,
    html: body,
    cc
  };

  return nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'demo.amela@gmail.com',//'',
      pass: 'amela@123',
    }
  }).sendMail(mailOptions);
};