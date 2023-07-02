"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
//req validation with zod
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        location: zod_1.z.enum([...cow_constant_1.location], {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum([...cow_constant_1.breed], {
            required_error: 'Cow breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'Cow weight is required',
        }),
        label: zod_1.z.enum([...cow_constant_1.label], {
            required_error: 'Label is required',
        }),
        category: zod_1.z.enum([...cow_constant_1.category], {
            required_error: 'Cow category is required',
        }),
        seller: zod_1.z.string({
            required_error: 'Cow seller is required',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.location]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.breed]).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum([...cow_constant_1.label]).optional(),
        category: zod_1.z.enum([...cow_constant_1.category]).optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
