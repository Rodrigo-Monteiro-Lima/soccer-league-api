import StatusCodes from '../utils/statusCode';
import Match from '../database/models/match.model';

export default interface IServiceMatch {
  getAll(p: string | undefined): Promise<Match[]>,
  updateToFinished(id: string): Promise<{ status: StatusCodes, message: string }>
}
