import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: string[];
  owner: Types.ObjectId | IUser;
};

export type IBookFilters = {
  searchTerm?: string;
  city?: string;
  bedrooms?: string;
  bathrooms?: string;
  roomSize?: string;
  availabilityDate?: string;
  rentPerMonth?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
