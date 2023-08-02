import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService, HouseService } from './house.service';
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

const updateHouse = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const houseId = req.params.id;
  const updatedData = req.body;
  const result = await HouseService.updateHouse(userId, houseId, updatedData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House updated successfully',
    data: result,
  });
});

const deleteHouse = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const houseId = req.params.id;
  const result = await HouseService.deleteHouse(userId, houseId);
  sendResponse<IBook | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  getAllHouses,
  updateHouse,
  deleteHouse,
};
