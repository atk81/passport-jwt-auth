import fs from 'fs';
import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import path from 'path';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user.model';
import { findUser } from '../services/user.services';
import { PASSPHRASE } from '../utils/secret';
const pathToPublicKey = path.join(__dirname, '..', '..', '.public.key.pem');
const pathToPrivateKey = path.join(__dirname, '..', '..', '.private.key');
const publicKey = fs.readFileSync(pathToPublicKey, 'utf8');
const privateKey = fs.readFileSync(pathToPrivateKey, 'utf8');

/**
 * @description Verify the JWT token
 */
// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256'],
  maxage: '1 day'
};

/**
 * Create a passport strategy for JWT
 * @param passport Passport object to be used for authentication
 */
export const strategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (jwt_payload, done) => {
      try {
        const user = await findUser({ id: jwt_payload.id });
        if (user) {
          return done(null, user, { message: 'Successfully authenticated' });
        }
        return done(null, false, { message: 'User not found' });
      } catch (err) {
        return done(err, false, { message: 'Error while authenticating' });
      }
    })
  );
};

/**
 * Generate a JWT token for the user
 * @param user User object to be used for authentication
 * @returns JWT token, expiresIn
 */
export const issueJwt = (user: UserDocument) => {
  const _id = user._id;
  const expiresIn = '1h';
  const payload = {
    id: _id,
    iat: Date.now()
  };
  const signedToken = jwt.sign(
    payload,
    {
      key: privateKey,
      passphrase: PASSPHRASE
    },
    {
      algorithm: 'RS256',
      expiresIn: '1 day'
    }
  );

  return {
    token: 'Bearer ' + signedToken, // Bearer is the prefix for JWT
    expiresIn: expiresIn
  };
};
