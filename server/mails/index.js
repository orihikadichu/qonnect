import nodemailer from 'nodemailer';


// メール送信関連
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'qonnect.2019@gmail.com',
    pass: 'Qonnect0607'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

export const sendMail = (params, cb) => {
  const { from, to, subject, text } = params;
  const message = { from, to, subject, text };

  transporter.sendMail(message, cb);

};

export const sendMailFromAdmin = (params, cb) => {
  const from = "info@qonnect.world";
  params['from'] = from;
  return sendMail(params, cb);
};
