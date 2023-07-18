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

export const UserValidation = {
  createUserZodSchema,
};
