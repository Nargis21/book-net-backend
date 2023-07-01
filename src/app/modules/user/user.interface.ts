/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export type IUser = Document & {
  role: 'seller' | 'buyer';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  phoneNumber: string;
  budget: number;
  income: number;
};

//statics
export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'role'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
