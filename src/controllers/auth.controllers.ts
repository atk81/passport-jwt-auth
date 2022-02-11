import { Request, Response, NextFunction } from 'express';
import { issueJwt } from '../config/passport';
import { createUser, validateUser } from '../services/user.services';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  // Email and Password are already validated by the middleware
  try {
    const user = await createUser({ email, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  // Email and Password are already validated by the middleware
  try {
    const isValidUser = await validateUser(email, password);
    if (isValidUser.isValid && isValidUser.user !== null) {
      const tokenObject = issueJwt(isValidUser.user);
      res.status(200).json({
        message: 'Login Successful',
        token: tokenObject.token,
        expiresIn: tokenObject.expiresIn
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    next(err);
  }
};
