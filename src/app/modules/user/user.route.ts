import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.getProfile
);
router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  validateRequest(UserValidation.updateProfileZodSchema),
  UserController.updateProfile
);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
