import express from 'express';
import { BookingController, WishlistController } from './wishlist.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation, WishlistValidation } from './wishlist.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/',
  validateRequest(WishlistValidation.createWishlistZodSchema),
  auth(),
  WishlistController.createWishlist
);

router.get('/', auth(), WishlistController.getWishlist);

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.RENTER),
//   BookingController.deleteBooking
// );

export const WishlistRoutes = router;
