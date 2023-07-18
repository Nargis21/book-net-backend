import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './house.validation';
import { HouseController } from './house.controller';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  // auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.createCowZodSchema),
  HouseController.createHouse
);

router.get(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  HouseController.getOwnedCow
);

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SELLER),
//   validateRequest(CowValidation.updateCowZodSchema),
//   CowController.updateCow
// );

// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

router.get(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER),
  HouseController.getAllHouses
);

export const HouseRoutes = router;
