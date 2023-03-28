import { ModelStatic } from 'sequelize';
import Team from '../database/models/team.model';
import { IServiceTeam } from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  #model: ModelStatic<Team>;

  constructor(model: ModelStatic<Team>) {
    this.#model = model;
  }

  getAll = async (): Promise<Team[]> => this.#model.findAll();
}
