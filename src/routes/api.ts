import { Router } from 'express';
import { authRouter } from './auth';
import { indexRouter } from './index';

const app = Router();
app.use('/api/auth', authRouter);
app.use('/api/users', indexRouter);

export { app as apiRouter };
