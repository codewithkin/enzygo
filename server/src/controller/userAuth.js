import argon2 from 'argon2'
import userModel from "../models/userModel.js";
import unifiedResponse from "../utils/unifiedResponseFormat.js";
import { verifyVerificationToken, generateSessionToken } from '../utils/tokenGenerator.js';
import { sendPlainTextEmail } from '../utils/sendPlainTextEmail.js';
const verifyEmail= async ( req, res) => {
    try {
        const {token} = req.query

        if (!token) {
            return res.json(unifiedResponse(
                500,
                "No token provided",
                null
            ))
        }
        // Check if the token is valid
        const validation = await verifyVerificationToken(token)

        // Check if the email matches
        const emailVerification = await userModel.findOne({ email: validation.email})
        if (!emailVerification) {
            return res.json(unifiedResponse(
                404,
                "invalid user verification",
                null
            ))
        }

        // check if the user matches
        if (validation.username !== emailVerification.username) {
            return res.json(unifiedResponse(
                404,
                "invalid user verification",
                null
            ))
        }

        const valid = await argon2.verify(emailVerification.verificationToken.token, token)
        if (!valid) {
            return res.json(unifiedResponse(
                404,
                "invalid user verification",
                null
            ))
        }

        if (emailVerification.verificationToken.expires < Date.now()) {
            return res.json(unifiedResponse(
                400,
                "Please request a new verification token",
                null
            ))
        }

        emailVerification.isVerified = true
        emailVerification.verificationToken = undefined

        await emailVerification.save()

        const sessionInfo = {
            email: emailVerification.email,
            username: emailVerification.username
        }
        const sessionToken = await generateSessionToken(sessionInfo)

        const sessionHash = await argon2.hash(sessionToken)

        // Expires in 3 days ( declare here to avoid repetition)
        const sessionTokenExpiration = new Date(Date.now() + 259200000);

        emailVerification.session = { token: sessionHash, expires: sessionTokenExpiration}
        await emailVerification.save()

        // Send a welcome email to the user after verification
        sendPlainTextEmail(
            emailVerification.email,
            "Welcome to Anzygo",
            `<h1>Hey ${emailVerification.username},</h1>
            <p>Welcome to Anzygo ! Thank you for signing up with us, we're very happy to have you !</p>`
            );

        return res.json(unifiedResponse(
            200,
            "Email verified successfully",
            sessionToken
        ))

    } catch (err) {
        console.error("Email verification error", err.message)
        return res.json(unifiedResponse(
            500,
            "Email verification failed, please try again",
            null
        ))
    }}

export default verifyEmail
