import {V4} from 'paseto';

const generateVerificationToken = async (verificationInfo) => {
    // Generate a unique verification token
    const token = crypto.randomBytes(32).toString("hex");
    // const plainTextToken = `${email}${token}${Date.now()}`;
    // Hash the verification token
    return await V4.sign({...verificationInfo, token}, process.env.PRIVATE_KEY, { expiresIn: '2minutes' });
}


const generateSessionToken = async (email, username, created_at=Date.now()) => {
    // Create a session token containing the email, username, and creation timestamp
    // return await argon2.hash(JSON.stringify({ email, username, created_at}));
    const token = crypto.randomBytes(32).toString("hex");
    const sessionInfo = {
        email,
        username,
        token,
        created_at,
    }
    return await V4.sign(sessionInfo, process.env.PRIVATE_KEY, { expiresIn: '3days' });
}

const verifyVerificationToken = async (verificationToken) => {
    if (!verificationToken){
        throw new Error('No verification token Provided')
    }

    try {
        const verification = await V4.verify(verificationToken, process.env.PUBLIC_KEY)
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

const verifySessionToken = async (sessionToken) => {
    if (!sessionInfo) {
        throw new Error('session token not provided')
    }

    try {
        const verification = await V4.verify(sessionToken, process.env.PUBLIC_KEY)
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


export { generateVerificationToken, generateSessionToken, verifyVerificationToken, verifySessionToken };