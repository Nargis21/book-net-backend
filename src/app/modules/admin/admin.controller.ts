import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import config from '../../../config';
import { IAdmin, IAdminLoginResponse } from './admin.interface';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await AdminService.createAdmin(adminData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?._id;
  const result = await AdminService.getProfile(id);
  sendResponse<IAdmin | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin's information retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?._id;
  const updatedData = req.body;
  const result = await AdminService.updateProfile(id, updatedData);
  sendResponse<Pick<IAdmin, 'name' | 'address' | 'phoneNumber'> | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.loginAdmin(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IAdminLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin logged in successfully',
    data: others,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
  getProfile,
  updateProfile,
};
