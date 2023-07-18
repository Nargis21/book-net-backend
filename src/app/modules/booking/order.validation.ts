import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    renter: z.string({
      required_error: 'Renter Id is required',
    }),
    house: z.string({
      required_error: 'House Id is required',
    }),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
};
