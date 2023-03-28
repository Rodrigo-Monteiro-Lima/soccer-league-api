import Match from '../database/models/match.model';

export default interface IServiceMatch {
  getAll(): Promise<Match[]>,
}
