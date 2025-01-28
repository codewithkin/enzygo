/**
 * Encrypts and decrypts text using AES-256-CBC encryption.
 */

import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

/**
 * Encrypts the given text.
 * @param {String} text The text to encrypt.
 * @returns {Object} An object containing the encrypted text and the used IV.
 */
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return { iv: iv.toString('hex'), encryptedData: encrypted };
}

/**
 * Decrypts the given text.
 * @param {Object} text An object containing the encrypted text and the used IV.
 * @returns {String} The decrypted text.
 */
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export { encrypt, decrypt };
