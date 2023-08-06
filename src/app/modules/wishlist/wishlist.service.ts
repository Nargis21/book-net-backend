import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const createWishlist = async (
  wishlistData: IWishlist
): Promise<IWishlist | null> => {
  const createWishlist = Wishlist.create(wishlistData);
  if (!createWishlist) {
    throw new ApiError(400, 'Failed to create wishlist!');
  }
  return createWishlist;
};

const getWishlist = async (userEmail: string): Promise<IWishlist[]> => {
  const wishlist = await Wishlist.find({ email: userEmail }).populate('book');

  return wishlist;
};

const deleteWishlist = async (
  userEmail: string,
  wishlistId: string
): Promise<IWishlist | null> => {
  const wishlist = await Wishlist.findById(wishlistId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'wishlist does not exist');
  }

  if (wishlist.email !== userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This is not your wishlist book');
  }

  const result = await Wishlist.findByIdAndDelete(wishlistId);
  return result;
};

export const WishlistService = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
