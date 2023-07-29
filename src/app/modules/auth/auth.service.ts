import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  ILoginUser,
  // IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { User } from '../user/user.model';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { userEmail } = payload;

  //check admin exist
  const isUserExist = await User.isUserExist(userEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const { _id, email } = isUserExist;

  //create access token
  const accessToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //create refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifiedToken = null;

//   //verify refresh token
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (error) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
//   }
//   const { _id } = verifiedToken;

//   //verify user exist
//   const isUserExist = await User.isUserExist(_id);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   //generate new access token
//   const newAccessToken = jwtHelpers.createToken(
//     { _id: isUserExist._id, role: isUserExist.role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };
// const getAuth = async (token: string) => {
//   let verifiedToken = null;
//   const accessToken = token.split(' ')[1];
//   //verify token
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       accessToken,
//       config.jwt.secret as Secret
//     );
//   } catch (error) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
//   }

//   const user = await User.findById(verifiedToken._id);

//   return {
//     user: user,
//   };
// };

export const AuthService = {
  loginUser,
  // refreshToken,
  // getAuth,
};
