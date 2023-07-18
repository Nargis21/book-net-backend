import express from 'express';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './order.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.createBookingZodSchema),
  // auth(ENUM_USER_ROLE.BUYER),
  BookingController.createBooking
);

// router.get(
//   '/',
//   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   OrderController.getAllOrders
// );

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  BookingController.getBookings
);

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SELLER),
  BookingController.deleteBooking
);

export const BookingRoutes = router;
