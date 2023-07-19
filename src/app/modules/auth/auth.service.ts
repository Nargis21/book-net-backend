import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ILoginUser,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { User } from '../user/user.model';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  //check admin exist
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const { _id, password: savedPassword, role } = isUserExist;

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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  //verify refresh token
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { _id } = verifiedToken;

  //verify user exist
  const isUserExist = await User.isUserExist(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new access token
  const newAccessToken = jwtHelpers.createToken(
    { _id: isUserExist._id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
const getAuth = async (token: string) => {
  let verifiedToken = null;

  //verify refresh token
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  return {
    payload: verifiedToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
  getAuth,
};
