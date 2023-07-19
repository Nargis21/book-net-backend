import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookingService } from './booking.service';
import { IBooking } from './booking.interface';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { ...bookingData } = req.body;
  const result = await BookingService.createBooking(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  // const userId = req.user?._id;
  const userId = req.params.id;
  const result = await BookingService.getBookings(userId);
  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking information retrieved successfully',
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

export const BookingController = {
  createBooking,
  getBookings,
  deleteBooking,
};
