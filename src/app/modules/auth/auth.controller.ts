import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { IUserLoginResponse } from './auth.interface';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IUserLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
