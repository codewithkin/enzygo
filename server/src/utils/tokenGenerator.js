/**
 * Generates a verification token to be sent to the user's email
 * @param {string} email - The email of the user
 * @returns {string} - The verification token
 */

import { encrypt } from "./Encryption.js";
import { hash } from "argon2";

export const generateVerificationToken = async (email) => {
    return await hash(`${email}${Date.now()}`);
}

export const generateSessionToken = async (email, username) => {
    const token = encrypt(JSON.stringify({ email, username }));

    return token;
};