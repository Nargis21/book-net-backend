import express from 'express';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.createBookingZodSchema),
  auth(ENUM_USER_ROLE.RENTER),
  BookingController.createBooking
);

router.get('/', auth(ENUM_USER_ROLE.RENTER), BookingController.getBookings);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.RENTER),
  BookingController.deleteBooking
);

export const BookingRoutes = router;
