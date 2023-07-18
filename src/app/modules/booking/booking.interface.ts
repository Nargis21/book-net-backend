import { Model, Types } from 'mongoose';
import { IHouse } from '../house/house.interface';
import { IUser } from '../user/user.interface';

export type IBooking = {
  name: string;
  email: string;
  phoneNumber: string;
  renter: Types.ObjectId | IUser;
  house: Types.ObjectId | IHouse;
};

export type BookingModel = Model<IBooking, Record<string, unknown>>;
