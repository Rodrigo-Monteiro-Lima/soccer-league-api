import { RequestHandler } from 'express';
import { IServiceTeam } from '../interfaces/serviceTeam.interface';
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

  getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { status, team } = await this.#service.getById(id);
    return res.status(status).json(team);
  };
}
