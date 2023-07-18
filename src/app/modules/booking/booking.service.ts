import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (
  bookingData: IBooking
): Promise<IBooking | null> => {
  const createdBooking = Booking.create(bookingData);
  if (!createdBooking) {
    throw new ApiError(400, 'Failed to create booking!');
  }
  return createdBooking;
};

// const getAllOrders = async (
//   userId: string,
//   role: string
// ): Promise<IOrder[]> => {
//   const orders = await Order.find()
//     .populate({
//       path: 'cow',
//       populate: [
//         {
//           path: 'seller',
//         },
//       ],
//     })
//     .populate('buyer');
//   let filteredOrders: IOrder[] = [];

//   if (role === 'admin') {
//     // Admin can access all orders
//     filteredOrders = orders;
//   } else if (role === 'buyer') {
//     // Buyer can access their own orders
//     filteredOrders = orders.filter(
//       order => order.buyer._id.toString() === userId
//     );
//   } else if (role === 'seller') {
//     // Seller can access orders related to their cows
//     filteredOrders = orders.filter(
//       order => (order.cow as ICow).seller._id.toString() === userId
//     );
//   }

//   return filteredOrders;
// };

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

  // if (house.owner.toString() !== userId) {
  //   throw new ApiError(
  //     httpStatus.FORBIDDEN,
  //     'You are not the owner of this house'
  //   );
  // }

  const result = await Booking.findByIdAndDelete(bookingId);
  return result;
};

export const BookingService = {
  createBooking,
  getBookings,
  deleteBooking,
};
