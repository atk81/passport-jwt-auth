import dotenv from 'dotenv';
import express from 'express';
import databaseConnect from './config/database';
import { apiRouter } from './routes/api';
const app = express();
dotenv.config();

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  databaseConnect();
});
