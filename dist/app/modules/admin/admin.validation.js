"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
//req validation with zod
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...admin_constant_1.role], {
            required_error: 'Role is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        phoneNumber: zod_1.z.string({
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
const loginAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
    loginAdminZodSchema,
};
