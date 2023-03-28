import HttpException from './HttpException';
import StatusCodes from '../utils/statusCode';

export default class UnprocessableContentExeception extends HttpException {
  static #status = StatusCodes.UNPROCESSABLE_CONTENT;

  constructor(message: string) {
    super(UnprocessableContentExeception.#status, message);
  }
}
