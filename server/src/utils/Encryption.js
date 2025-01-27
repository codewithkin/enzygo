/**
 * Encrypts the given text using AES-256-CBC encryption.
 * @param {String} text The text to encrypt.
 * @returns {Object} An object containing the encrypted text and the used IV.
 */

import crypto from 'crypto';

const algorithm = process.env.NODE_CRYPTO_ALGORITHM;
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    // Create a cipher object to encrypt the text
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    // Encrypt the text
    let encrypted = cipher.update(text);

    // Concatenate the encrypted text with the final block
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Return the encrypted text and the used IV
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

/**
 * Decrypts the given text using AES-256-CBC decryption.
 * @param {Object} text An object containing the encrypted text and the used IV.
 * @returns {String} The decrypted text.
 */

function decrypt(text) {
    // Get the IV from the object
    let iv = Buffer.from(text.iv, 'hex');

    // Get the encrypted text from the object
    let encryptedText = Buffer.from(text.encryptedData, 'hex');

    // Create a decipher object to decrypt the text
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    // Decrypt the text
    let decrypted = decipher.update(encryptedText);

    // Concatenate the decrypted text with the final block
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    // Return the decrypted text
    return decrypted.toString();
}

export { encrypt, decrypt };