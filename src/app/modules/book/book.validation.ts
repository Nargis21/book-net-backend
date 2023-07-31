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
const updateHouseZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    bedrooms: z.number().min(1).positive().optional(),
    bathrooms: z.number().min(1).positive().optional(),
    roomSize: z.number().min(1).positive().optional(),
    picture: z.string().optional(),
    availabilityDate: z.string().optional(),
    rentPerMonth: z.number().min(1).positive().optional(),
    phoneNumber: z
      .string()
      .regex(/^(\+88)?01[0-9]{9}$/)
      .optional(),
    description: z.string().optional(),
    owner: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateHouseZodSchema,
};
