import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest, UserPayload } from '../types';
import { AppError } from '../utils/appError';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new AppError("JWT_SECRET is required", 401);

  try {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
    if (!token || token === "undefined" || token === "null") {
      throw new AppError("Unauthorized: Token missing", 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Unauthorized: Invalid token", 401);
  }
};