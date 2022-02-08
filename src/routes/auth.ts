import { Router } from 'express';
import { signup, login } from '../controllers/auth.controllers';
import { validateSignup } from '../schema/user/auth.schema';
const router = Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);

export { router as authRouter };
