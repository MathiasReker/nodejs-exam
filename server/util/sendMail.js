import nodemailer from "nodemailer"

export async function sendMail(from, to, subject, text) {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: process.env.SMTP_PORT,
        secure: false, // TODO
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    let info = await transporter.sendMail({
        from,
        to,
        subject,
        text
    });

    console.log("Message send: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
