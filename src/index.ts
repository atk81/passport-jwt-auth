import dotenv from 'dotenv';
import express from 'express';
import databaseConnect from "./config/database"
const app = express();
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  databaseConnect();
});
