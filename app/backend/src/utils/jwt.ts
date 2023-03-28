import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IAuthToken, IJwtPayload, IToken } from '../interfaces/auth.interface';

dotenv.config();

export default class Token implements IToken {
  #jwt;

  #secret: jwt.Secret;

  #options: jwt.SignOptions;

  constructor() {
    this.#jwt = jwt;
    this.#secret = process.env.JWT_SECRET || 'secret';
    this.#options = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
  }

  generateToken(payload: IJwtPayload) {
    return this.#jwt.sign(payload, this.#secret, this.#options);
  }

  async authToken(token: string): Promise<IAuthToken> {
    const validateToken = await this.#jwt.verify(token, this.#secret);
    return validateToken as IAuthToken;
  }
}
