"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
//req validation with zod
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Title is required'),
        author: zod_1.z.string().nonempty('Author is required'),
        genre: zod_1.z.string().nonempty('Genre is required'),
        publicationDate: zod_1.z.string().nonempty('Publication date is required'),
        image: zod_1.z.string().nonempty('Image is required'),
        reviews: zod_1.z.array(zod_1.z.string()).optional(),
        owner: zod_1.z.string().nonempty('Owner Id is required'),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        reviews: zod_1.z.array(zod_1.z.string()).optional(),
        owner: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
};
