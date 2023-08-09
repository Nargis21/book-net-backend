import ApiError from '../../../errors/ApiError';
import { IBook } from './book.interface';
import { Book } from './book.model';
import httpStatus from 'http-status';

const createBook = async (book: IBook): Promise<IBook | null> => {
  const createdBook = Book.create(book);
  if (!createdBook) {
    throw new ApiError(400, 'Failed to create book!');
  }
  return createdBook;
};

const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find();
  return result;
};

const getTopTen = async (): Promise<IBook[]> => {
  const result = await Book.find().sort({ createdAt: -1 }).limit(10);
  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const addReview = async (
  bookId: string,
  payload: string
): Promise<IBook | null> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }
  book?.reviews?.push(payload);
  const result = await book.save();

  return result;
};

const updateBook = async (
  userEmail: string,
  bookId: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  if (book.owner !== userEmail) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the owner of this book'
    );
  }

  const result = await Book.findOneAndUpdate({ _id: bookId }, payload, {
    new: true,
  });
  return result;
};

const deleteBook = async (
  userEmail: string,
  bookId: string
): Promise<IBook | null> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  if (book.owner !== userEmail) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not the owner of this book'
    );
  }

  const result = await Book.findByIdAndDelete(bookId);
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getTopTen,
  getSingleBook,
  addReview,
  updateBook,
  deleteBook,
};
