import { z } from 'zod';
import { breed, category, label, location } from './cow.constant';

//req validation with zod
const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    age: z.number({
      required_error: 'Age is required',
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'Cow breed is required',
    }),
    weight: z.number({
      required_error: 'Cow weight is required',
    }),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'Label is required',
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'Cow category is required',
    }),
    seller: z.string({
      required_error: 'Cow seller is required',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z.enum([...label] as [string, ...string[]]).optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
