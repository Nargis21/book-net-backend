/* eslint-disable no-unused-vars */
import { Document } from 'mongoose';
import { Model } from 'mongoose';

export type IAdmin = Document & {
  role: 'admin';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  phoneNumber: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type IAdminLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

//statics
export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, '_id' | 'password' | 'role'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
