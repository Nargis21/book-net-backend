import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const createBooking = async (
  wishlistData: IWishlist
): Promise<IWishlist | null> => {
  const createWishlist = Wishlist.create(wishlistData);
  if (!createWishlist) {
    throw new ApiError(400, 'Failed to create wishlist!');
  }
  return createWishlist;
};

const getBookings = async (userId: string): Promise<IWishlist[]> => {
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
): Promise<IWishlist | null> => {
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
