import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get('/', BookController.getAllBooks);
router.get('/get-top-ten', BookController.getTopTen);
router.get('/:id', BookController.getSingleBook);
router.patch('/add-review/:id', BookController.addReview);

router.patch(
  '/:id',
  auth(),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.delete('/:id', auth(), BookController.deleteBook);

// router.get('/', HouseController.getAllHouses);

export const BookRoutes = router;
