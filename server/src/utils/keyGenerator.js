import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const {privateKey, publicKey} = crypto.generateKeyPairSync("ed25519",{
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'spki', format: 'pem' },
})

const privateKeyGenerated = `PRIVATE_KEY=${privateKey}`
const publicKeyGenerated = `PUBLIC_KEY=${publicKey}`

const thePath = path.join("C:/\Users/\Admin/\My-Projects/\Portfolio/\enzygo/\server",".env");

fs.appendFileSync(thePath, privateKeyGenerated)
fs.appendFileSync(thePath, publicKeyGenerated)

console.log('key generated');
