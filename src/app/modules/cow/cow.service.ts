import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericPaginationResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
import { cowSearchableFields } from './cow.constant';
import httpStatus from 'http-status';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const createdCow = Cow.create(cow);
  if (!createdCow) {
    throw new ApiError(400, 'Failed to create Cow!');
  }
  return createdCow;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice) {
    andConditions.push({ price: { $gte: minPrice } });
  }
  if (maxPrice) {
    andConditions.push({ price: { $lte: maxPrice } });
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

  const result = await Cow.find(whereCondition)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const updateCow = async (
  userId: string,
  cowId: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow does not exist');
  }

  if (cow.seller.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the seller of this cow'
    );
  }

  const result = await Cow.findOneAndUpdate({ _id: cowId }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

const deleteCow = async (
  userId: string,
  cowId: string
): Promise<ICow | null> => {
  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow does not exist');
  }

  if (cow.seller.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the seller of this cow'
    );
  }
  const result = await Cow.findByIdAndDelete(cowId);
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
