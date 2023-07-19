import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { HouseValidation } from './house.validation';
import { HouseController } from './house.controller';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.OWNER),
  validateRequest(HouseValidation.createHouseZodSchema),
  HouseController.createHouse
);

router.get(
  '/getOwned',
  auth(ENUM_USER_ROLE.OWNER),
  HouseController.getOwnedHouse
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.OWNER),
  validateRequest(HouseValidation.updateHouseZodSchema),
  HouseController.updateHouse
);

router.delete('/:id', auth(ENUM_USER_ROLE.OWNER), HouseController.deleteHouse);

router.get('/', HouseController.getAllHouses);

export const HouseRoutes = router;
