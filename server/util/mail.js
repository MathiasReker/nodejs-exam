import nodemailer from 'nodemailer';

const sendMail = async (from, to, subject, text) => {
  const testAccount = await nodemailer.createTestAccount();

  const {
    SMTP_HOST, SMTP_PORT,
  } = process.env;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: +SMTP_PORT === 465,
    auth: {
      user: testAccount.user, // SMTP_USER
      pass: testAccount.pass, // SMTP_PASSWORD
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
