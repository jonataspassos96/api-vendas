import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/auth';

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('JWT Token is missing.');
  }

  try {
    verify(authorization, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}

export default isAuthenticated;