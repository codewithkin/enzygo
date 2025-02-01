import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "admin@anzygo.online",
    pass: "a19Eea31-992c-4A9f-a082-E4b797cEbFC2",
  },
});

async function sendPlainTextEmail (destination, subject, text) {
    try {
        await transporter.sendMail({
            from: "The Anzygo Team <admin@anzygo.online>",
            to: destination,
            subject,
            text
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function sendVerificationEmail (email, username, redirectUrl) {
    try {
        const htmlContent = `
        <h1>Welcome to Anzygo, ${username}!</h1>
        <p>Please click the following link to verify your account:</p>
        <a href="${redirectUrl}">Verify Account</a>
    `;
        await transporter.sendMail({
            from: "The Anzygo Team <admin@anzygo.online>",
            to: email,
            subject: "Verify your Anzygo account",
            text: htmlContent
        });
    } catch (err) {
        console.error(err.message);
    }
}

export {sendPlainTextEmail, sendVerificationEmail};