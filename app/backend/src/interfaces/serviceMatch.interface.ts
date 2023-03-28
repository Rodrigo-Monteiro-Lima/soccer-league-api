import StatusCodes from '../utils/statusCode';
import Match from '../database/models/match.model';
import { IMatch, INewMatch } from './match.interface';

export default interface IServiceMatch {
  getAll(p: string | undefined): Promise<Match[]>,
  updateToFinished(id: string): Promise<{ status: StatusCodes, message: string }>,
  update(id: string, b: IMatch): Promise<{ status: StatusCodes, match: Match }>,
  create(b: INewMatch): Promise<{ status: StatusCodes, match: Match }>
}
