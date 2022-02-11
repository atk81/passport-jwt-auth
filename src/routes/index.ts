import { Router } from 'express';
import passport from 'passport';
import { welcome } from '../controllers/index.controllers';

const router = Router();
router.post('/welcome',passport.authenticate('jwt',{session: false}), welcome);

export{
   router as indexRouter 
}
