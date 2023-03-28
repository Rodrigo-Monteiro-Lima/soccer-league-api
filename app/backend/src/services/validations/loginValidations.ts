import UnauthorizedExeception from '../../errors/UnauthorizedExeception';
import BadRequestException from '../../errors/BadRequestException';
import { ILoginValidation, ILogin } from '../../interfaces/login.interface';
import loginSchema from './schemas';

export default class LoginValidation implements ILoginValidation {
  validateLogin = (login: ILogin) => {
    const { error } = loginSchema.validate(login);
    const isUnauthorized = error?.message.includes('Invalid');
    if (isUnauthorized) throw new UnauthorizedExeception(error?.message as string);
    if (!isUnauthorized && error) throw new BadRequestException(error?.message as string);
  };
}
