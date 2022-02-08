import fs from 'fs';
import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import path from 'path';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user.model';
import { findUser } from '../services/user.services';
const pathToPublicKey = path.join(__dirname, '..', '..', '.id_rsa_public.pem');
const pathToPrivateKey = path.join(
  __dirname,
  '..',
  '..',
  '.id_rsa_private.pem'
);
const publicKey = fs.readFileSync(pathToPublicKey, 'utf8');
const privateKey = fs.readFileSync(pathToPrivateKey, 'utf8');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256']
};

/**
 * Create a passport strategy for JWT
 * @param passport Passport object to be used for authentication
 */
export const strategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const user = await findUser({ id: jwt_payload.id });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
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
  console.log(user);
  const _id = user._id;
  const expiresIn = '1h';
  const payload = {
    id: _id,
    iat: Date.now()
  };
  const signedToken = jwt.sign(payload, privateKey, { expiresIn: expiresIn });

  return {
    token: 'Bearer ' + signedToken, // Bearer is the prefix for JWT
    expiresIn: expiresIn
  };
};
