import { RequestHandler } from 'express';
import { IServiceTeam } from '../interfaces/IServiceTeam';
import StatusCodes from '../utils/statusCode';

export default class TeamController {
  #service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this.#service = service;
  }

  getAll: RequestHandler = async (_req, res) => {
    const teams = await this.#service.getAll();
    return res.status(StatusCodes.OK).json(teams);
  };
}
