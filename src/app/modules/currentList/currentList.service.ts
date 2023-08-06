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

const deleteCurrentList = async (
  userEmail: string,
  currentListId: string
): Promise<ICurrentList | null> => {
  const currentList = await CurrentList.findById(currentListId);
  if (!currentList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book does not exist');
  }

  if (currentList.email !== userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This is not your listed book');
  }

  const result = await CurrentList.findByIdAndDelete(currentListId);
  return result;
};
const updateCurrentList = async (
  userEmail: string,
  currentListId: string
): Promise<ICurrentList | null> => {
  const currentList = await CurrentList.findById(currentListId);
  if (!currentList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'book does not exist');
  }

  if (currentList.email !== userEmail) {
    throw new ApiError(httpStatus.FORBIDDEN, 'This is not your listed book');
  }

  currentList.isComplete = true;
  const result = await currentList.save();
  return result;
};

export const CurrentListService = {
  createCurrentList,
  getCurrentList,
  deleteCurrentList,
  updateCurrentList,
};
