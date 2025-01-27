import argon2 from 'argon2'
import userModel from "../models/userModel.js";
import unifiedResponse from "../utils/unifiedResponseFormat.js";
import { verifyVerificationToken, generateSessionToken } from '../utils/tokenGenerator.js';
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
    // Expires in 3 days
    // const sessionTokenExpiration = new Date(Date.now() + 259200000);

    // Create a session token containing the user's data
    // const sessionToken = await argon2.hash(JSON.stringify({ email, username, created_at: Date.now() }));

    // Save the session token in a secure cookie
    // res.cookie("sessionToken", 
    //     sessionToken, 
    //     { expires: sessionTokenExpiration, 
    //         httpOnly: true, 
    //         sameSite: "strict",
    //         secure: process.env.NODE_ENV === "production" ? true : false,
    //         domain: process.env.NODE_ENV === "production" ? ".anzygo.com" : ""
    //     });