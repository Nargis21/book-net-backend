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

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const bookingId = req.params.id;
  const result = await BookingService.deleteBooking(userId, bookingId);
  sendResponse<IBooking | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const WishlistController = {
  createWishlist,
  getWishlist,
  deleteBooking,
};
