import { RequestHandler } from 'express';
import IServiceMatch from '../interfaces/serviceMatch.interface';
import StatusCodes from '../utils/statusCode';

export default class MatchController {
  #service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this.#service = service;
  }

  getAll: RequestHandler = async (_req, res) => {
    const matches = await this.#service.getAll();
    res.status(StatusCodes.OK).json(matches);
  };
}
