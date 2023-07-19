"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
//req validation with zod
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...user_constant_1.role], {
            required_error: 'Role is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
