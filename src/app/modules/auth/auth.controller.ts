import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface';
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

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'New access token generated successfully !',
    data: result,
  });
});
const getAuth = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization;
  const result = await AuthService.getAuth(accessToken as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Authenticated user get successfully !',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  getAuth,
};
