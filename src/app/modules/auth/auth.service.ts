import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILoginUser, IUserLoginResponse } from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { User } from '../user/user.model';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { phoneNumber, password } = payload;

  //check admin exist
  const isAdminExist = await User.isUserExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const { _id, password: savedPassword, role } = isAdminExist;

  //check password
  if (!(await User.isPasswordMatched(password, savedPassword))) {
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

export const AuthService = {
  loginUser,
};
