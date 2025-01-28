import argon2 from "argon2";
import userModel from "../models/userModel.js";
import { unifiedResponse } from "../utils/unifiedResponseFormat.js";
import rootUrls from "../utils/rootUrl.js";
import {sendPlainTextEmail, sendVerificationEmail} from "../utils/sendPlainTextEmail.js";
import { generateVerificationToken} from "../utils/tokenGenerator.js";

const userReg = async (req, res) => {
    
    try {
        // Expires in 2 minutes ( declare here to avoid repetition)
        const verificationTokenExpiration = new Date(Date.now() + 120000);

        const { email, username} = req.body;

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
            //check if verification token has expired
            if(userEmailExists.verificationToken?.expires > Date.now()) {
                return res.json(unifiedResponse(
                    409,
                    "Check your email to verify your account to continue",
                    null
                ))
            }
            // Generate a unique verification token
            const verification = await generateVerificationToken({email: email})

            // hash the verification token
            const hashedToken = await argon2.hash(verification)

            // Specify the url the user will be redirected to upon successful verification
            const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${verification}`;

            // Update the user's verification token and session
            const updateData = {
                verificationToken: { token: hashedToken, expires: verificationTokenExpiration },
            }
            // Update the user's data in the database
            await userModel.updateOne({ email }, updateData);


            // Send the verification callBackUrl to the user's email
            // The email should contain a link to the callBackUrl
            if (userEmailExists.isVerified) {
                await sendPlainTextEmail(email,
                    "Verify your Anzygo Login",
                    `<h1>Welcome back ${userEmailExists.username}</h1>
                    <p>Please click the following link to verify your login:</p>
                    <a href="${callBackUrl}">Verify Login</a>`
                )
            } else {
                await sendVerificationEmail(email, userEmailExists.username, callBackUrl)
            }

            return res.json(unifiedResponse(
                    200,
                    `A login verification link has been sent to your email.`,
                    null
                ))
        }

        // Generate a unique verification token
        const verification = await generateVerificationToken({email: email})

        // hash the verification token
        const hashedToken = await argon2.hash(verification)

        // Specify the url the user will be redirected to upon successful verification
        const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${verification}`;

        // Create new user
        const newUser = new userModel({
            username,
            email,
            verificationToken: { token: hashedToken, expires: verificationTokenExpiration },
            isVerified: false
        });

        // Save user to database
        await newUser.save();

        // Send a welcome email to the user

        // TODO: Send a welcome email to the user after verification
        // sendPlainTextEmail(
        //     email,
        //     "Welcome to Anzygo",
        //     "Hey, welcome to Anzygo ! Thank you for signing up with us, we're very happy to have you !"
        // );

        // Send the verification callBackUrl to the user's email
        // The email should contain a link to the callBackUrl
        await sendVerificationEmail(email, username, callBackUrl)

        return res.status(201).json({
            status : 201,
            message : 'User Created Successfully',
            verificationMessage : 'A verification link has been sent to your email',
            data : {
                username,
                email
            }
        })
    } catch (err) {
        console.error("Registration Error:",err.message);
        return res.status(500).json(unifiedResponse(500, "Server Error, please try again later", null));
    }
}

export default userReg;