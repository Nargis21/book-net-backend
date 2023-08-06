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

const getCurrentList = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const result = await CurrentListService.getCurrentList(userEmail);
  sendResponse<ICurrentList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current list retrieved successfully',
    data: result,
  });
});

const deleteCurrentList = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const currentListId = req.params.id;
  const result = await CurrentListService.deleteCurrentList(
    userEmail,
    currentListId
  );
  sendResponse<ICurrentList | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Current list deleted successfully',
    data: result,
  });
});

export const CurrentListController = {
  createCurrentList,
  getCurrentList,
  deleteCurrentList,
};
