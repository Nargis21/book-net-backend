import express from 'express';
import { UserValidation } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const AuthRoutes = router;
