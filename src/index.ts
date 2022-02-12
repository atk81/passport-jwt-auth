import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { strategy } from './config/passport';
import databaseConnect from './config/database';
import { apiRouter } from './routes/api';
import { errorHandler } from './utils/errorHandler';
const app = express();
dotenv.config();

/**
 * Passport middleware
 */
strategy(passport);
app.use(passport.initialize());

/**
 * MIDDLEWARE
 */
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * ROUTES
 * The routes are defined in the src/routes folder.
 */
app.use(apiRouter);

/**
 * ERROR HANDING
 */
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleError(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  databaseConnect();
});
