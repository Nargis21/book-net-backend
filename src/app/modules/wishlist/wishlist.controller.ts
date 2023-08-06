import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WishlistService } from './wishlist.service';
import { IWishlist } from './wishlist.interface';

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const { ...wishlistData } = req.body;
  const result = await WishlistService.createWishlist(wishlistData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added to wishlist',
    data: result,
  });
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const result = await WishlistService.getWishlist(userEmail);
  sendResponse<IWishlist[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrieved successfully',
    data: result,
  });
});

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const wishlistId = req.params.id;
  const result = await WishlistService.deleteWishlist(userEmail, wishlistId);
  sendResponse<IWishlist | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist deleted successfully',
    data: result,
  });
});

export const WishlistController = {
  createWishlist,
  getWishlist,
  deleteWishlist,
};
