import { Router } from 'express';
import { signup } from '../controllers/auth.controllers';
import { validateSignup } from '../schema/user/auth.schema';
const router = Router();

router.post('/signup', validateSignup, signup);

export { router as authRouter };
