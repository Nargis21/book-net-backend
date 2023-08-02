import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';

export type IWishlist = {
  email: string;
  book: Types.ObjectId | IBook;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
