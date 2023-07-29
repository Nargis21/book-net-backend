import { z } from 'zod';

const loginUserZodSchema = z.object({
  body: z.object({
    userEmail: z.string({
      required_error: 'Email is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const AuthValidation = {
  loginUserZodSchema,
  refreshTokenZodSchema,
};
