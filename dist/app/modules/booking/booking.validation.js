"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        renter: zod_1.z.string({
            required_error: 'Renter Id is required',
        }),
        house: zod_1.z.string({
            required_error: 'House Id is required',
        }),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
};
