import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { HouseService } from './house.service';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { houseFilterableFields } from './house.constant';
import { paginationFields } from '../../../constants/pagination';
import { IHouse } from './house.interface';

const createHouse = catchAsync(async (req: Request, res: Response) => {
  const { ...houseData } = req.body;
  const result = await HouseService.createHouse(houseData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'House created successfully',
    data: result,
  });
});

const getAllHouses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, houseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await HouseService.getAllHouses(filters, paginationOptions);
  sendResponse<IHouse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getOwnedCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HouseService.getOwnedCow(id);
  sendResponse<IHouse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Houses retrieved successfully',
    data: result,
  });
});

// const updateCow = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user?._id;
//   const cowId = req.params.id;
//   const updatedData = req.body;
//   const result = await CowService.updateCow(userId, cowId, updatedData);
//   sendResponse<ICow>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cow updated successfully',
//     data: result,
//   });
// });

// const deleteCow = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user?._id;
//   const cowId = req.params.id;
//   const result = await CowService.deleteCow(userId, cowId);
//   sendResponse<ICow | null>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Cow deleted successfully',
//     data: result,
//   });
// });

export const HouseController = {
  createHouse,
  getOwnedCow,
  getAllHouses,
  // updateCow,
  // deleteCow,
};
