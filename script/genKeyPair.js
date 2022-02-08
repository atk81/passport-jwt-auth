const crypto = require('crypto');
const fs = require('fs');
const path = require("path");
const genKeyPair = () => {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1" 
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
    });
    const publicKey = keyPair.publicKey;
    const privateKey = keyPair.privateKey;
    fs.writeFileSync('../.id_rsa_public.pem', publicKey);
    fs.writeFileSync('../.id_rsa_private.pem', privateKey);
}

genKeyPair();