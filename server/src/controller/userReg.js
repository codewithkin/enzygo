import bcrypt from "bcrypt";
import argon2 from "argon2";

import userModel from "../models/userModel.js";
import { unifiedResponse } from "../utils/unifiedResponseFormat.js";
import rootUrls from "../utils/rootUrl.js";
import { sendVerificationEmail} from "../utils/sendPlainTextEmail.js";
import { generateVerificationToken, generateSessionToken } from "../utils/tokenGenerator.js";

const userReg = async (req, res) => {
    
    try {
        // Expires in 2 minutes ( declare here to avoid repetition)
        const verificationTokenExpiration = new Date(Date.now() + 120000);

        // Expires in 3 days ( declare here to avoid repetition)
        const sessionTokenExpiration = new Date(Date.now() + 259200000);

        const { email, username, password } = req.body;

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
            // check if the user is verified
            if(userEmailExists.isVerified) {
                return res.json(unifiedResponse(
                    409,
                    `An Account with ${email} already exists \n Please login to continue`,
                    null
                ))
            } else {
                // since the user is not verified resend a new verification token

                //check if verification token has expired
                if(userEmailExists.verificationToken.expires > Date.now()) {
                    return res.json(unifiedResponse(
                        409,
                        "Check your eamil to verify your account to continue",
                        null
                    ))
                }

                // Generate a unique verification token
                const hashedToken = await generateVerificationToken(email)

                // Specify the url the user will be redirected to upon successful verification
                const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${hashedToken}`;

                // Create a session token containing the user's data
                const sessionToken = await generateSessionToken(email, username);

                // Update the user's verification token and session
                const updateData = {
                    verificationToken: { token: hashedToken, expires: verificationTokenExpiration },
                };

                updateData.session = { token: sessionToken, expires: sessionTokenExpiration };

                await userModel.updateOne({ email }, updateData);

                // Send the verification callBackUrl to the user's email
                // The email should contain a link to the callBackUrl
                await sendVerificationEmail(email, callBackUrl)

                return res.json(unifiedResponse(
                    200,
                    `Your account is not yet verified.\n
                    A new verification link has been sent to your email.`,
                    null
                ))
            }
        }
        // Hash password
        const hashedPassword = await argon2.hash(password);

        // Generate a unique verification token
        const hashedToken = await generateVerificationToken(email)

        // Specify the url the user will be redirected to upon successful verification
        const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${hashedToken}`;

        // Create a session token containing the user's data
        const sessionToken = await generateSessionToken(email, username);

        // Create new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            verificationToken: { token: hashedToken, expires: verificationTokenExpiration },
            session: { token: sessionToken, expires: sessionTokenExpiration },
            isVerified: false,
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
        await sendVerificationEmail(email, callBackUrl)

        res.status(201).json({
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
        res.status(500).json(unifiedResponse(500, "Server Error, please try again later", null));
    }
}

export default userReg;