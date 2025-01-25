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

export default sendPlainTextEmail;