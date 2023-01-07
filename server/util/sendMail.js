import nodemailer from 'nodemailer';

const sendMail = async (from, to, subject, text) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });

  if (process.env.NODE_ENV === 'dev') {
    console.log('Message send: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export default sendMail;
