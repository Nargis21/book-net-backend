/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, IAdminLoginResponse, ILoginAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const createdAdmin = await Admin.create(admin);
  if (!createdAdmin) {
    throw new ApiError(400, 'Failed to create admin!');
  }
  // Exclude the password field from the response
  const responseAdmin = await Admin.findById(createdAdmin._id).select(
    '-password'
  );

  return responseAdmin;
};

const getProfile = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id, {
    _id: 0,
    name: 1,
    phoneNumber: 1,
    address: 1,
  });
  return result;
};

const updateProfile = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<Pick<IAdmin, 'name' | 'address' | 'phoneNumber'> | null> => {
  const isExist = await Admin.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  const { name, ...adminData } = payload;
  const updatedAdminData = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ _id: id }, updatedAdminData, {
    new: true,
    select: '-_id name address phoneNumber',
  });
  return result;
};

const loginAdmin = async (
  payload: ILoginAdmin
): Promise<IAdminLoginResponse> => {
  const { phoneNumber, password } = payload;

  //check admin exist
  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not found');
  }
  const { _id, password: savedPassword, role } = isAdminExist;

  //check password
  if (!(await Admin.isPasswordMatched(password, savedPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //create refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
  getProfile,
  updateProfile,
};
