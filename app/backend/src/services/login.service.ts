import { ModelStatic } from 'sequelize';
import { compareSync } from 'bcryptjs';
import { ILoginValidation, ILogin } from '../interfaces/login.interface';
import User from '../database/models/user.model';
import UnauthorizedExeception from '../errors/UnauthorizedExeception';
import { IToken } from '../interfaces/auth.interface';
import StatusCodes from '../utils/statusCode';
import IServiceLogin from '../interfaces/serviceLogin.interface';

export default class LoginService implements IServiceLogin {
  #model: ModelStatic<User>;
  #validation: ILoginValidation;
  #token: IToken;

  constructor(token: IToken, model: ModelStatic<User>, validation: ILoginValidation) {
    this.#validation = validation;
    this.#token = token;
    this.#model = model;
  }

  login = async (login: ILogin) => {
    this.#validation.validateLogin(login);
    const { email, password } = login;
    const user = await this.#model.findOne({ where: { email }, raw: true });
    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedExeception('Incorrect email or password');
    }
    const { password: _, ...rest } = user;
    const token = this.#token.generateToken({ ...rest });
    return { status: StatusCodes.OK, token };
  };
}
