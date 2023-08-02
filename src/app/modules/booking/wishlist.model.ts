import { Schema, model } from 'mongoose';
import { IWishlist, WishlistModel } from './wishlist.interface';

const WishlistSchema = new Schema<IWishlist>(
  {
    email: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Wishlist = model<IWishlist, WishlistModel>(
  'Wishlist',
  WishlistSchema
);
