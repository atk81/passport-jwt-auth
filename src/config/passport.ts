import fs from "fs";
import { PassportStatic } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import path from "path";
import jsonwebtoken from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import { findUser } from "../services/user.services";
const pathToKey = path.join(__dirname, ".." , ".id_rsa_public_pem");
const publicKey = fs.readFileSync(pathToKey, "utf8");
const privateKey = fs.readFileSync(pathToKey, "utf8");


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithms: ["RS256"]
};

/**
 * Create a passport strategy for JWT
 * @param passport Passport object to be used for authentication
 */
const strategy =(passport: PassportStatic) => {
    passport.use(
        new Strategy(opts,async (jwt_payload, done) => {
            try{
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
}

/**
 * Create a passport strategy for JWT
 * @param user User object to be used for authentication
 * @returns JWT token, expiresIn
 */
const issueJwt = (user: UserDocument) => {
    const _id = user._id;
    const expireIn = "1h";
    const payload = {
        id: _id,
        iat: Date.now(),
    }
    const signToken = jsonwebtoken.sign(payload, privateKey, { expiresIn: expireIn, algorithm: "RS256" });
    return {
        token: signToken,
        expiresIn: expireIn
    }
}

module.exports = {
    strategy,
    issueJwt
}
