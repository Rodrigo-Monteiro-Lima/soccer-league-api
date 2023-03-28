import StatusCodes from '../utils/statusCode';
import { ILogin } from './login.interface';

export default interface IServiceLogin {
  login(l: ILogin): Promise<{ status: StatusCodes, token: string }>,
}
