import {Router} from "express";
import { authRouter } from "./auth";

const app = Router();
app.use('/api/auth', authRouter);

export {
    app as apiRouter
}

