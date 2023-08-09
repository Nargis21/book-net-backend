"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = require("./book.model");
const http_status_1 = __importDefault(require("http-status"));
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = book_model_1.Book.create(book);
    if (!createdBook) {
        throw new ApiError_1.default(400, 'Failed to create book!');
    }
    return createdBook;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find();
    return result;
});
const getTopTen = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find().sort({ createdAt: -1 }).limit(10);
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
const addReview = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book does not exist');
    }
    (_a = book === null || book === void 0 ? void 0 : book.reviews) === null || _a === void 0 ? void 0 : _a.push(payload);
    const result = yield book.save();
    return result;
});
const updateBook = (userEmail, bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book does not exist');
    }
    if (book.owner !== userEmail) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the owner of this book');
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: bookId }, payload, {
        new: true,
    });
    return result;
});
const deleteBook = (userEmail, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book does not exist');
    }
    if (book.owner !== userEmail) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the owner of this book');
    }
    const result = yield book_model_1.Book.findByIdAndDelete(bookId);
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getTopTen,
    getSingleBook,
    addReview,
    updateBook,
    deleteBook,
};
