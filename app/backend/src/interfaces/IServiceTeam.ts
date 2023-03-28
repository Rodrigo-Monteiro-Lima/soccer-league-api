import Team from '../database/models/team.model';

export interface IServiceTeam {
  getAll(): Promise<Team[]>,
}
