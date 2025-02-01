import userModel from "../../models/userModel.js";
import { generateSessionToken, generateVerificationToken } from "../../utils/tokenGenerator.js";
import rootUrls from "../../utils/rootUrl.js";
import { sendPlainTextEmail, sendVerificationEmail } from "../../utils/sendPlainTextEmail.js";
import {unifiedResponse} from "../../utils/unifiedResponseFormat.js";

export default async function userSignUp (req, res) {
    const { email, username } = req.body;

    // Set verification token expiration (2 minutes)
    const verificationTokenExpiration = Date.now() + 120000;

    // Set the session token expiration (3 days)
    const sessionTokenExpiration = Date.now() + 259200000;

    // Generate a verification token
    const verificationToken = { token: generateVerificationToken({ email }), expires: verificationTokenExpiration }; //generateVerificationToken({ email });

    // Generate a session token
    const sessionToken = await generateSessionToken(email, username);

    // Specify a callbackUrl
    const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${verificationToken}`;

    // Check if the username is taken
    const usernameIsTaken = await userModel.findOne({ username });

    if(usernameIsTaken) {
        return res.json(
            unifiedResponse(
                400,
                "Username is already taken",
                null
            )
        );
    }

    // Send a welcome email
    await sendPlainTextEmail(
        email,
        "Welcome to Anzygo",
        `Hey ${username}, Welcome to Anzygo! We're happy to have you here !`
    );

    // Send a verification link
    await sendVerificationEmail(email, callBackUrl);

    // Create a new user
    const newUser = await userModel.create({
        email,
        username,
        verificationToken: {
            token: verificationToken,
            expires: verificationTokenExpiration
        },
        session: {
            token: sessionToken,
            expires: sessionTokenExpiration
        }
    });

    res.status(200).json(
        unifiedResponse(
            200,
            "User created successfully",
            verificationToken
        )
    );
}   