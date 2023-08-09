"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentListValidation = void 0;
const zod_1 = require("zod");
const createCurrentListZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        book: zod_1.z.string({
            required_error: 'Book Id is required',
        }),
    }),
});
exports.CurrentListValidation = {
    createCurrentListZodSchema,
};
