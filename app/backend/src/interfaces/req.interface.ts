import { Request } from 'express';
import { IAuthToken } from './auth.interface';

export default interface IReq extends Request {
  user?: IAuthToken;
}
