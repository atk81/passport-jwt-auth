import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
import { welcome } from '../controllers/index.controllers';
const use = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const router = Router();
router.post(
  '/welcome',
  passport.authenticate('jwt', { session: false }),
  use(welcome)
);

export { router as indexRouter };
