import HttpException from './HttpException';
import StatusCodes from '../utils/statusCode';

export default class UnauthorizedExeception extends HttpException {
  static #status = StatusCodes.UNAUTHORIZED;

  constructor(message: string) {
    super(UnauthorizedExeception.#status, message);
  }
}
