/**
 * This file is used for verifying the env variables.
 */

import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

const PASSPHRASE: string = process.env.PASSPHRASE || '12345678';

const ENVIRONMENT: string = process.env.ENVIRONMENT || 'DEV';

export { MONGODB_URI, PASSPHRASE, ENVIRONMENT };
