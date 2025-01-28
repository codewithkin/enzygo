import crypto from 'crypto';
import fs from 'fs';

// const thePath = path.join("C:/\Users/\Admin/\My-Projects/\Portfolio/\enzygo/\server",".env");
// dotenv.config(thePath);

const {privateKey, publicKey} = crypto.generateKeyPairSync('ed25519',
    {
        modulusLength: 521,
        publicKeyEncoding: {type: 'spki', format: 'pem'},
        privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
    }
)

fs.appendFileSync('.env', `PRIVATE_KEY=${privateKey}\n`);
fs.appendFileSync('.env', `PUBLIC_KEY=${publicKey}\n`);

console.log('Keys generated and saved to .env');