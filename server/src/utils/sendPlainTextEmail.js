import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "admin@anzygo.online",
    pass: process.env.EMAIL_DOMAIN_PASSWORD,
  },
});

async function sendPlainTextEmail (destination, subject, text) {
    try {
        await transporter.sendMail({
            from: "The Anzygo Team <welcome.anzygo.online>",
            to: destination,
            subject,
            text
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function sendVerificationEmail (email, redirectUrl) {
    try {
        await transporter.sendMail({
            from: "The Anzygo Team <welcome.anzygo.online>",
            to: email,
            subject: "Verify your Anzygo account",
            text: `Hey, Please click the following link to verify your account: ${redirectUrl}`
        });
    } catch (err) {
        console.error(err.message);
    }
  
}

async function sendResetPasswordEmail (email, redirectUrl) {
    try {
        await transporter.sendMail({
            from: "The Anzygo Team <welcome.anzygo.online>",
            to: email,
            subject: "Reset your Anzygo password",
            text: `Hey, Please click the following link to reset your password: ${redirectUrl}\n
            If you did not request this, please ignore this email and your password will remain unchanged.`
        });
    } catch (err) {
        console.error(err.message);
    }
  }
export default {sendPlainTextEmail, sendVerificationEmail};