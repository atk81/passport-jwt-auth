import { Router } from 'express';
import passport from 'passport';
import { welcome } from '../controllers/index.controllers';

const router = Router();
router.post('/welcome',passport.authenticate('jwt',(err, user,info)=>{
    console.log(info);
    console.log(err);
    console.log(user);
}), welcome);

export{
   router as indexRouter 
}
