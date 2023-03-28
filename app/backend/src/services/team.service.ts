import { ModelStatic } from 'sequelize';
import StatusCodes from '../utils/statusCode';
import Team from '../database/models/team.model';
import { IServiceTeam } from '../interfaces/IServiceTeam';
import NotFoundException from '../errors/NotFoundException';

export default class TeamService implements IServiceTeam {
  #model: ModelStatic<Team>;

  constructor(model: ModelStatic<Team>) {
    this.#model = model;
  }

  getAll = async (): Promise<Team[]> => this.#model.findAll();

  getById = async (id: string) => {
    const team = await this.#model.findByPk(id);
    if (!team) throw new NotFoundException('Team not found!');
    return { status: StatusCodes.OK, team };
  };
}
