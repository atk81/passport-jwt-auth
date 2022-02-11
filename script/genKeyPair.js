"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
var path_1 = require("path");
var fs_1 = require("fs");
require('dotenv').config();
var _a = (0, crypto_1.generateKeyPairSync)('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: process.env.PASSPHRASE
    }
}), publicKey = _a.publicKey, privateKey = _a.privateKey;
(0, fs_1.writeFileSync)((0, path_1.join)(__dirname, "..", '.private.key'), privateKey);
(0, fs_1.writeFileSync)((0, path_1.join)(__dirname, "..", '.public.key.pem'), publicKey);
