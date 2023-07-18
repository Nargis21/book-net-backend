/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export type IUser = Document & {
  role: 'owner' | 'renter';
  password: string;
  name: string;
  phoneNumber: string;
  email: string;
};

//statics
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'role'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
