/**
 * Generates a verification token to be sent to the user's email
 * @param {string} email - The email of the user
 * @returns {string} - The verification token
 */

import { encrypt } from "./Encryption.js";

export const generateVerificationToken = async (email) => await argon2.hash(`${email}${Date.now()}`);

export const generateSessionToken = async (email, username) => encrypt(JSON.stringify({ email, username }));