import { ModelStatic } from 'sequelize';
import NotFoundException from '../errors/NotFoundException';
import StatusCodes from '../utils/statusCode';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import IServiceMatch from '../interfaces/serviceMatch.interface';

export default class TeamService implements IServiceMatch {
  #model: ModelStatic<Match>;
  #teamModel: ModelStatic<Team>;

  constructor(model: ModelStatic<Match>, teamModel: ModelStatic<Team>) {
    this.#model = model;
    this.#teamModel = teamModel;
  }

  getAll = async (inProgress: string | undefined): Promise<Match[]> => {
    const matches = await this.#model.findAll({
      include: [
        { model: this.#teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this.#teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    if (inProgress) return matches.filter((m) => m.inProgress === JSON.parse(inProgress));
    return matches;
  };

  updateToFinished = async (id: string) => {
    const idExists = await this.#model.findByPk(id);
    if (!idExists) throw new NotFoundException('Match not found');
    await this.#model.update({ inProgress: false }, { where: { id } });
    return { status: StatusCodes.OK, message: 'Finished' };
  };
}
