import jwt from "jsonwebtoken";
import { encrypt } from './Encryption.js';

const {sign, verify} = jwt;

const generateVerificationToken = (verificationInfo) => sign(verificationInfo, process.env.SECRET_KEY, {expiresIn: '120000'});


const generateSessionToken = async (email, username, created_at=Date.now()) => {
    // Create a session token containing the email, username, and creation timestamp
    // return await argon2.hash(JSON.stringify({ email, username, created_at}));

    // Get the user's session info
    const sessionInfo = {
        email,
        username,
        created_at,
    }

    // Encrypt the user's session info
    return encrypt(JSON.stringify(sessionInfo))
}

const verifyVerificationToken = async (verificationToken) => {
    if (!verificationToken){
        throw new Error('No verification token Provided')
    }

    try {
        const verification = verify(verificationToken, process.env.SECRET_KEY);

        if (verification) {
            return verification
        } else {
            throw new Error('Verification token not valid')
        }
    } catch (err) {
        console.error(err)
        throw new Error('invalid verification token')
    }
}

export { generateVerificationToken, generateSessionToken, verifyVerificationToken };