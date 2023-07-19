"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseValidation = void 0;
const zod_1 = require("zod");
//req validation with zod
const createHouseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty('Name is required'),
        address: zod_1.z.string().nonempty('Address is required'),
        city: zod_1.z.string().nonempty('City is required'),
        bedrooms: zod_1.z
            .number()
            .min(1, 'Bedrooms should be at least 1')
            .positive('Bedrooms should be a positive number'),
        bathrooms: zod_1.z
            .number()
            .min(1, 'Bathrooms should be at least 1')
            .positive('Bathrooms should be a positive number'),
        roomSize: zod_1.z
            .number()
            .min(1, 'Room size should be at least 1')
            .positive('Room size should be a positive number'),
        picture: zod_1.z.string().nonempty('Picture is required'),
        availabilityDate: zod_1.z.string().nonempty('Date is required'),
        rentPerMonth: zod_1.z
            .number()
            .min(1, 'Rent per month should be at least 1')
            .positive('Rent per month should be a positive number'),
        phoneNumber: zod_1.z
            .string()
            .regex(/^(\+88)?01[0-9]{9}$/, 'Invalid phone number format'),
        description: zod_1.z.string().nonempty('Description is required'),
        owner: zod_1.z.string().nonempty('Owner Id is required'),
    }),
});
const updateHouseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        bedrooms: zod_1.z.number().min(1).positive().optional(),
        bathrooms: zod_1.z.number().min(1).positive().optional(),
        roomSize: zod_1.z.number().min(1).positive().optional(),
        picture: zod_1.z.string().optional(),
        availabilityDate: zod_1.z.string().optional(),
        rentPerMonth: zod_1.z.number().min(1).positive().optional(),
        phoneNumber: zod_1.z
            .string()
            .regex(/^(\+88)?01[0-9]{9}$/)
            .optional(),
        description: zod_1.z.string().optional(),
        owner: zod_1.z.string().optional(),
    }),
});
exports.HouseValidation = {
    createHouseZodSchema,
    updateHouseZodSchema,
};
