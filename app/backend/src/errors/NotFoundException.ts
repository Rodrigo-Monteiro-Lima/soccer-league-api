import StatusCodes from '../utils/statusCode';
import HttpException from './HttpException';

export default class NotFoundException extends HttpException {
  static #status = StatusCodes.NOT_FOUND;

  constructor(message: string) {
    super(NotFoundException.#status, message);
  }
}
