import { RequestHandler } from 'express';
import IServiceLeaderboard from '../interfaces/serviceLeaderboard.interface';
import StatusCodes from '../utils/statusCode';

export default class LeaderboardController {
  #service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this.#service = service;
  }

  getHome: RequestHandler = async (_req, res) => {
    const leaderboard = await this.#service.getHome();
    return res.status(StatusCodes.OK).json(leaderboard);
  };

  getAway: RequestHandler = async (_req, res) => {
    const leaderboard = await this.#service.getAway();
    return res.status(StatusCodes.OK).json(leaderboard);
  };

  getAll: RequestHandler = async (_req, res) => {
    const leaderboard = await this.#service.getAll();
    return res.status(StatusCodes.OK).json(leaderboard);
  };
}
