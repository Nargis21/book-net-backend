import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericPaginationResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { houseSearchableFields } from './house.constant';
import httpStatus from 'http-status';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const createdBook = Book.create(book);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to create book!');
  }
  return createdBook;
};

const getAllHouses = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: houseSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await House.find(whereCondition)
    .populate('owner')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await House.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find();
  return result;
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const updateHouse = async (
  userId: string,
  houseId: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const house = await House.findById(houseId);
  if (!house) {
    throw new ApiError(httpStatus.NOT_FOUND, 'House does not exist');
  }

  if (house.owner.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the owner of this house'
    );
  }

  const result = await House.findOneAndUpdate({ _id: houseId }, payload, {
    new: true,
  }).populate('owner');
  return result;
};

const deleteHouse = async (
  userId: string,
  houseId: string
): Promise<IBook | null> => {
  const house = await House.findById(houseId);
  if (!house) {
    throw new ApiError(httpStatus.NOT_FOUND, 'house does not exist');
  }

  // if (house.owner.toString() !== userId) {
  //   throw new ApiError(
  //     httpStatus.FORBIDDEN,
  //     'You are not the owner of this house'
  //   );
  // }

  const result = await House.findByIdAndDelete(houseId);
  return result;
};

export const BookService = {
  createBook,
  getAllHouses,
  getAllBooks,
  getSingleBook,
  updateHouse,
  deleteHouse,
};
