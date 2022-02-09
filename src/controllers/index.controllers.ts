import { Request, Response } from 'express';

export const welcome = (req: Request, res: Response) => {
  // Get the user out of the JWT payload
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'You are not logged in'
    });
  }
  res.status(200).json({
    message: 'Welcome to the API',
    user
  });
};
