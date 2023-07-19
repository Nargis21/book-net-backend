import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (
  bookingData: IBooking,
  userId
): Promise<IBooking | null> => {
  const booking = await Booking.find({ renter: userId });
  if (booking.length === 2) {
    throw new ApiError(
      400,
      'You can book maximum 2 house. Please free up your space and try again.'
    );
  }
  const createdBooking = Booking.create(bookingData);
  if (!createdBooking) {
    throw new ApiError(400, 'Failed to create booking!');
  }
  return createdBooking;
};

const getBookings = async (userId: string): Promise<IBooking[]> => {
  const bookings = await Booking.find({ renter: userId })
    .populate({
      path: 'house',
      populate: [
        {
          path: 'owner',
        },
      ],
    })
    .populate('renter');

  return bookings;
};

const deleteBooking = async (
  userId: string,
  bookingId: string
): Promise<IBooking | null> => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking does not exist');
  }

  if (booking.renter.toString() !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the owner of this house'
    );
  }

  const result = await Booking.findByIdAndDelete(bookingId);
  return result;
};

export const BookingService = {
  createBooking,
  getBookings,
  deleteBooking,
};
