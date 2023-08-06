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
router.delete('/:id', auth(), CurrentListController.deleteCurrentList);
router.patch('/:id', auth(), CurrentListController.updateCurrentList);
router.get('/', auth(), CurrentListController.getCurrentList);

export const CurrentListRoutes = router;
