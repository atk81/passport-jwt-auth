const crypto = require('crypto');
const fs = require('fs');
const path = require("path");
const genKeyPair = () => {
    const key = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'password'
        }
    });
    const publicKey = key.publicKey;
    const privateKey = key.privateKey;
    console.log(__dirname);
    fs.writeFileSync('../.id_rsa_public.pem', publicKey);
    fs.writeFileSync('../.id_rsa_private.pem', privateKey);
}

genKeyPair();