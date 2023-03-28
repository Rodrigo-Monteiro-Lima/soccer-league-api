import HttpException from './HttpException';
import StatusCodes from '../utils/statusCode';

export default class BadRequestException extends HttpException {
  static #status = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(BadRequestException.#status, message);
  }
}
