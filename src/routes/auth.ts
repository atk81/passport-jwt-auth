import { Request, Response, NextFunction, Router } from 'express';
import { signup, login } from '../controllers/auth.controllers';
import { validateSignup } from '../schema/user/auth.schema';
const router = Router();

/**
 * Handling async/await
 */
const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/signup', validateSignup, use(signup));
router.post('/login', login);

export { router as authRouter };
