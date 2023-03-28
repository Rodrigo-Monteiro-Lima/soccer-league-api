import { Request, Response } from 'express';
import { ILogin } from '../interfaces/login.interface';
import IServiceLogin from '../interfaces/serviceLogin.interface';

export default class LoginController {
  #service: IServiceLogin;

  constructor(service: IServiceLogin) {
    this.#service = service;
  }

  login = async (req: Request<object, object, ILogin>, res: Response) => {
    const { body } = req;
    const { status, token } = await this.#service.login(body);
    return res.status(status).json({ token });
  };
}
