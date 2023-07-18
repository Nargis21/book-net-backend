import { z } from 'zod';
import { role } from './user.constant';

//req validation with zod
const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...role] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});
const updateProfileZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  updateProfileZodSchema,
};
