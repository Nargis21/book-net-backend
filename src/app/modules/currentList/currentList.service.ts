import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ICurrentList } from './currentList.interface';
import { CurrentList } from './currentList.model';

const createCurrentList = async (
  currentListData: ICurrentList
): Promise<ICurrentList | null> => {
  const createCurrentList = CurrentList.create(currentListData);
  if (!createCurrentList) {
    throw new ApiError(400, 'Failed to create current list!');
  }
  return createCurrentList;
};

const getCurrentList = async (userEmail: string): Promise<ICurrentList[]> => {
  const currentList = await CurrentList.find({ email: userEmail }).populate(
    'book'
  );

  return currentList;
};

const deleteWishlist = async (
  userEmail: string,
  wishlistId: string
): Promise<ICurrentList | null> => {
  const wishlist = await CurrentList.findById(wishlistId);
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'wishlist does not exist');
  }

  if (wishlist.email !== userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This is not your wishlist book');
  }

  const result = await CurrentList.findByIdAndDelete(wishlistId);
  return result;
};

export const CurrentListService = {
  createCurrentList,
  getCurrentList,
  deleteWishlist,
};
