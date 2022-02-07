import { body, validationResult } from 'express-validator';
import { findUser } from '../../services/user.services';
import { Request, Response, NextFunction } from 'express';

export const validateSignup = [
    // email
    body('email')
    .trim() // remove whitespace
    .isLength({min: 1}).withMessage('Email is required') // check if it's empty
    .isEmail().withMessage('Email is invalid') // check if it's an email
    .custom( async (value)=>{
        const user = await findUser(value);
        if(user){
            throw new Error('Email already in use');
        }
    }),

    // password
    body('password')
    .trim() // remove whitespace
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long') // check if it's at least 5 characters long
    .isStrongPassword().withMessage('Password must contain at least one number, one uppercase letter and one lowercase letter'),

    // validate
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
]