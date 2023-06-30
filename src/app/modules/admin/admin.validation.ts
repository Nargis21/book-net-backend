import { z } from 'zod';
import { role } from './admin.constant';

//req validation with zod
const createAdminZodSchema = z.object({
  body: z.object({
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
  }),
});

// const updateUserZodSchema = z.object({
//   body: z.object({
//     role: z.enum([...role] as [string, ...string[]]).optional(),
//     password: z.string().optional(),
//     name: z
//       .object({
//         firstName: z.string().optional(),
//         lastName: z.string().optional(),
//       })
//       .optional(),
//     address: z.string().optional(),
//     phoneNumber: z.string().optional(),
//     budget: z.number().optional(),
//     income: z.number().optional(),
//   }),
// });

const loginAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  loginAdminZodSchema,
};
