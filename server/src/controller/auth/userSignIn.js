import userModel from "../../models/userModel.js";
import rootUrls from "../../utils/rootUrl.js";
import { sendVerificationEmail } from "../../utils/sendPlainTextEmail.js";
import { generateSessionToken, generateVerificationToken } from "../../utils/tokenGenerator.js";
import unifiedResponse from "../../utils/unifiedResponseFormat.js";

export default function SignIn(req, res) {
    // Get the user's data
    const { email, username } = req.body;

    // Ensure the user exists
    const userExists = userModel.findOne({ email });

    if (!userExists) {
        return res.json(
            unifiedResponse(
                404,
                "User not found",
                null
            )
        );
    }

    // Generate a verification token
    const verificationToken = generateVerificationToken({ email });

    // Generate a session token for the user
    const sessionToken = generateSessionToken(email, username);

    // Set the callback URL
    const callBackUrl = `${rootUrls.frontendUrl}/verify-email?token=${verificationToken}`;

    // Send the verification token to the user's email
    sendVerificationEmail(email, username, callBackUrl);

    // Send a success response along with the "verification-token" cookie
    return res.json(unifiedResponse(200, "User signed in successfully", { verificationToken, sessionToken }));
}       