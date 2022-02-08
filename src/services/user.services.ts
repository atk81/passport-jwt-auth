/* eslint-disable @typescript-eslint/no-explicit-any */
import User, { UserInput } from '../models/user.model';
import { omit } from 'lodash';

export const createUser = async (userInput: UserInput) => {
  try {
    const user = await User.create(userInput);
    return omit(user.toJSON(), ['password']);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findUser = async (obj: any) => {
  try {
    const user = await User.findOne(obj);
    if (!user) {
      return null;
    }
    return omit(user.toJSON(), ['password']);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const validateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { user: null, isValid: false };
    }
    const isValid = await user.comparePassword(password);
    return { user, isValid };
  } catch (err: any) {
    throw new Error(err);
  }
};
