import bcrypt from "bcrypt";
import argon2 from "argon2";

import userModel from "../models/userModel.js";
import { unifiedResponse } from "../utils/unifiedResponseFormat.js";
import rootUrls from "../utils/rootUrl.js";
import sendPlainTextEmail from "../utils/sendPlainTextEmail.js";

const userReg = async (req, res) => {
    try {
        const { email, username } = req.body;

        // Check if the username is taken
        const userNameIsTaken = await userModel.findOne({ username });

        if(userNameIsTaken) {
            return res.json(unifiedResponse(
                409,
                "Username is already taken",
                null
            ))
        }

        // Validate email
        // check if a user with this email exists
        const userEmailExists = await userModel.findOne({ email });

        if(userEmailExists) {
            // Generate a unique verification token
            const plainTextToken = `${email}${Date.now()}`;

            // Hash the verification token
            const hashedToken = await argon2.hash(plainTextToken);

            // Specify the url the user will be redirected to upon successful verification
            const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${hashedToken}`;

            // Expires in 2 minutes
            const verificationTokenExpiration = new Date(Date.now() + 120000);

            // Expires in 3 days
            const sessionTokenExpiration = new Date(Date.now() + 259200000);

            // Create a session token containing the user's data
            const sessionToken = await argon2.hash(JSON.stringify({ email, username, created_at: Date.now() }));

            // Update the user's verification token and session 
            await userModel.updateOne({ email }, { verificationToken: { token: hashedToken, expires: verificationTokenExpiration }, session: { token: sessionToken, expires: sessionTokenExpiration } });

            // Send the verification callBackUrl to the user's email
            // The email should contain a link to the callBackUrl
            sendPlainTextEmail(
                email, 
                "Verify your email", 
                `Hey there, welcome to Anzygo ! Here is your sign in url: ${callBackUrl}`
            );

            return res.json(unifiedResponse(
                200,
                "Success ! A login link has been sent to your email",
                null
            ))
        }

        // Generate a unique verification token
        const plainTextToken = `${email}${Date.now()}`;

        // Hash the verification token
        const hashedToken = await argon2.hash(plainTextToken);
        
        // Specify the url the user will be redirected to upon successful verification
        const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${hashedToken}`;

        // Expires in 2 minutes
        const verificationTokenExpiration = new Date(Date.now() + 120000);

        // Expires in 3 days
        const sessionTokenExpiration = new Date(Date.now() + 259200000);

        // Create a session token containing the user's data
        const sessionToken = await argon2.hash(JSON.stringify({ email, username, created_at: Date.now() }));

        // Create new user
        const newUser = new userModel({
            username,
            verificationToken: { token: hashedToken, expires: verificationTokenExpiration },
            session: { token: sessionToken, expires: sessionTokenExpiration },
            email,
        });

        // Save user to database
        await newUser.save();

        // Send a welcome email to the user
        sendPlainTextEmail(
            email,
            "Welcome to Anzygo",
            "Hey there, welcome to Anzygo ! Thank you for signing up with us, we're very happy to have you !"
        );

        // Send the verification callBackUrl to the user's email
        // The email should contain a link to the callBackUrl
        sendPlainTextEmail(
            email, 
            "Verify your email", 
            `Hey there, welcome to Anzygo ! Here is your sign in url: ${callBackUrl}`
        );

        res.status(201).json({
            status : 201,
            message : 'User Created Successfully',
            data : {
                username,
                email
            }
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ Message : "Server Error please try again later" })
    }
}

export default userReg;