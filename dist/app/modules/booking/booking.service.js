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
exports.BookingService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = require("./booking.model");
const createBooking = (bookingData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.find({ renter: userId });
    if (booking.length === 2) {
        throw new ApiError_1.default(400, 'You can book maximum 2 house. Please free up your space and try again.');
    }
    const createdBooking = booking_model_1.Booking.create(bookingData);
    if (!createdBooking) {
        throw new ApiError_1.default(400, 'Failed to create booking!');
    }
    return createdBooking;
});
const getBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({ renter: userId })
        .populate({
        path: 'house',
        populate: [
            {
                path: 'owner',
            },
        ],
    })
        .populate('renter');
    return bookings;
});
const deleteBooking = (userId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking does not exist');
    }
    if (booking.renter.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the owner of this house');
    }
    const result = yield booking_model_1.Booking.findByIdAndDelete(bookingId);
    return result;
});
exports.BookingService = {
    createBooking,
    getBookings,
    deleteBooking,
};
