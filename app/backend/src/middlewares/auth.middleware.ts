import { NextFunction, Response } from 'express';
import IReq from '../interfaces/req.interface';
import { IToken } from '../interfaces/auth.interface';
import StatusCodes from '../utils/statusCode';

export default class AuthMiddleware {
  #token: IToken;

  constructor(token: IToken) {
    this.#token = token;
  }

  auth = async (req: IReq, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return next({ message: 'Token not found', status: StatusCodes.UNAUTHORIZED });
    try {
      const user = await this.#token.authToken(token);
      req.user = user;
      return next();
    } catch (error) {
      return next({ message: 'Token must be a valid token', status: StatusCodes.UNAUTHORIZED });
    }
  };
}
