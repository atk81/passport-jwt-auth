import { Request, Response, NextFunction } from 'express';
import { createUser } from '../services/user.services';

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
