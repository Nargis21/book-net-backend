import { Model } from 'mongoose';

export type IUser = {
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

export type UserModel = Model<IUser, Record<string, unknown>>;
