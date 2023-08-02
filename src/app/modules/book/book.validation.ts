import { z } from 'zod';

//req validation with zod
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    author: z.string().nonempty('Author is required'),
    genre: z.string().nonempty('Genre is required'),
    publicationDate: z.string().nonempty('Publication date is required'),
    image: z.string().nonempty('Image is required'),
    reviews: z.array(z.string()).optional(),
    owner: z.string().nonempty('Owner Id is required'),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    image: z.string().optional(),
    reviews: z.array(z.string()).optional(),
    owner: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
