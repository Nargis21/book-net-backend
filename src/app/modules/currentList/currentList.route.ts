import express from 'express';
import { CurrentListController } from './currentList.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CurrentListValidation } from './currentList.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(CurrentListValidation.createCurrentListZodSchema),
  auth(),
  CurrentListController.createCurrentList
);

router.get('/', auth(), CurrentListController.getCurrentList);

router.delete('/:id', auth(), CurrentListController.deleteCurrentList);

export const CurrentListRoutes = router;
