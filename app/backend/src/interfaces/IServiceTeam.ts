import StatusCodes from '../utils/statusCode';
import Team from '../database/models/team.model';

export interface IServiceTeam {
  getAll(): Promise<Team[]>,
  getById(id: string): Promise<{ status: StatusCodes, team: Team }>,
}
