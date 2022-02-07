import User,{ UserDocument, UserInput } from "../models/user.model";
import {omit} from "lodash";

export const createUser = async (userInput: UserInput)=>{
    try{
        const user = await User.create(userInput);
        return omit(user.toJSON(), ["password"]);
    } catch(err: any){
        throw new Error(err);
    }
}

export const findUser = async (email: string)=>{
    try{
        const user = await User.findOne({email});
        if(!user){
            return null;
        }
        return omit(user.toJSON(), ["password"]);
    } catch(err: any){
        throw new Error(err);
    }
}
