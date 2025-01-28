import { config } from "dotenv";
import nodemailer from "nodemailer"

config();

const transporter = nodemailer.createTransport({
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "admin@anzygo.online",
    pass: "a19Eea31-992c-4A9f-a082-E4b797cEbFC2",
  },
});

export async function sendPlainTextEmail (destination, subject, text) {
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

sendPlainTextEmail("kinzinzombe07@gmail.com", "Welcome to Anzygo", "Hey, Welcome to Anzygo! We're happy to have you here !");

export async function sendVerificationEmail (email, redirectUrl) {
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