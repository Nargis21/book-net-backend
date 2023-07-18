import { Model, Types } from 'mongoose';
import { ICow, IHouse } from '../house/house.interface';
import { IUser } from '../user/user.interface';

export type IOrder = {
  name: string;
  email: string;
  phoneNumber: string;
  renter: Types.ObjectId | IUser;
  house: Types.ObjectId | IHouse;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
