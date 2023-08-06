import express from 'express';
import { WishlistController } from './wishlist.controller';
import validateRequest from '../../middlewares/validateRequest';
import { WishlistValidation } from './wishlist.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(WishlistValidation.createWishlistZodSchema),
  auth(),
  WishlistController.createWishlist
);

router.get('/', auth(), WishlistController.getWishlist);

router.delete('/:id', auth(), WishlistController.deleteWishlist);

export const WishlistRoutes = router;
