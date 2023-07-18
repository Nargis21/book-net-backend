import { z } from 'zod';
import { breed, category, label, location } from './house.constant';

//req validation with zod
const createCowZodSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    address: z.string().nonempty('Address is required'),
    city: z.string().nonempty('City is required'),
    bedrooms: z
      .number()
      .min(1, 'Bedrooms should be at least 1')
      .positive('Bedrooms should be a positive number'),
    bathrooms: z
      .number()
      .min(1, 'Bathrooms should be at least 1')
      .positive('Bathrooms should be a positive number'),
    roomSize: z
      .number()
      .min(1, 'Room size should be at least 1')
      .positive('Room size should be a positive number'),
    picture: z.string().nonempty('Picture is required'),
    availabilityDate: z.string().nonempty('Date is required'),
    rentPerMonth: z
      .number()
      .min(1, 'Rent per month should be at least 1')
      .positive('Rent per month should be a positive number'),
    phoneNumber: z
      .string()
      .regex(/^01[0-9]{9}$/, 'Invalid phone number format'),
    description: z.string().nonempty('Description is required'),
    owner: z.string().nonempty('Owner Id is required'),
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
