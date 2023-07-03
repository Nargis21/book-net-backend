import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getProfile
);
router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminValidation.updateAdminProfileZodSchema),
  AdminController.updateProfile
);
router.post(
  '/login',
  validateRequest(AdminValidation.loginAdminZodSchema),
  AdminController.loginAdmin
);

export const AdminRoutes = router;
