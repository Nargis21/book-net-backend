import { z } from 'zod';

const createWishlistZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    book: z.string({
      required_error: 'Book Id is required',
    }),
  }),
});

export const WishlistValidation = {
  createWishlistZodSchema,
};
