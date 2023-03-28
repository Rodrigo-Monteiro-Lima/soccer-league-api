import { Request, RequestHandler, Response } from 'express';
import { IMatch, INewMatch } from '../interfaces/match.interface';
import IServiceMatch from '../interfaces/serviceMatch.interface';
import StatusCodes from '../utils/statusCode';

export default class MatchController {
  #service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this.#service = service;
  }

  getAll: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const matches = await this.#service.getAll(inProgress as string | undefined);
    res.status(StatusCodes.OK).json(matches);
  };

  updateToFinished: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { message, status } = await this.#service.updateToFinished(id);
    return res.status(status).json({ message });
  };

  update = async (
    req: Request<{ id: string },
    object, IMatch>,
    res: Response,
  ) => {
    const { params: { id }, body } = req;
    const { match, status } = await this.#service.update(id, body);
    return res.status(status).json(match);
  };

  create = async (req: Request<object, object, INewMatch>, res: Response) => {
    const { body } = req;
    const { match, status } = await this.#service.create(body);
    return res.status(status).json(match);
  };
}
