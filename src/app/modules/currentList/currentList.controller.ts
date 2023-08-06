import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CurrentListService } from './currentList.service';
import { ICurrentList } from './currentList.interface';

const createCurrentList = catchAsync(async (req: Request, res: Response) => {
  const { ...currentListData } = req.body;
  const result = await CurrentListService.createCurrentList(currentListData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added to current list',
    data: result,
  });
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const result = await CurrentListService.getWishlist(userEmail);
  sendResponse<ICurrentList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current list retrieved successfully',
    data: result,
  });
});

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const wishlistId = req.params.id;
  const result = await CurrentListService.deleteWishlist(userEmail, wishlistId);
  sendResponse<ICurrentList | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current list deleted successfully',
    data: result,
  });
});

export const CurrentListController = {
  createCurrentList,
  getWishlist,
  deleteWishlist,
};
