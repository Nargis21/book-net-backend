import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService, HouseService } from './book.service';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { houseFilterableFields } from './house.constant';
import { paginationFields } from '../../../constants/pagination';
import { IBook } from './book.interface';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  console.log(bookData);
  const result = await BookService.createBook(bookData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllHouses = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, houseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await HouseService.getAllHouses(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const result = await BookService.getSingleBook(bookId);
  sendResponse<IBook | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const review = req.body.comment;
  const result = await BookService.addReview(bookId, review);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Added successfully',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const bookId = req.params.id;
  const updatedData = req.body;
  const result = await BookService.updateBook(userEmail, bookId, updatedData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const bookId = req.params.id;
  const result = await BookService.deleteBook(userEmail, bookId);
  sendResponse<IBook | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  addReview,
  getAllHouses,
  updateBook,
  deleteBook,
};