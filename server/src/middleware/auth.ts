import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).json('Please authenticate');
  }
};
