import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IHouse = {
  name: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  roomSize: number;
  picture: string;
  availabilityDate: string;
  rentPerMonth: number;
  phoneNumber: string;
  description: string;
  owner: Types.ObjectId | IUser;
};

export type IHouseFilters = {
  searchTerm?: string;
  city?: string;
  bedrooms?: string;
  bathrooms?: string;
  roomSize?: string;
  availabilityDate?: string;
  rentPerMonth?: string;
};

export type HouseModel = Model<IHouse, Record<string, unknown>>;
