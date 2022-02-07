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
export { MONGODB_URI };
