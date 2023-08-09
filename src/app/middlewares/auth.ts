import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const token = accessToken.split(' ')[1];

    //verify token
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
