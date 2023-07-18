import { z } from 'zod';

//req validation with zod
const createHouseZodSchema = z.object({
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
      .regex(/^01[0-9]{9}$/)
      .optional(),
    description: z.string().optional(),
    owner: z.string().optional(),
  }),
});

export const HouseValidation = {
  createHouseZodSchema,
  updateHouseZodSchema,
};
