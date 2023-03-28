import { ModelStatic } from 'sequelize';
import NotFoundException from '../errors/NotFoundException';
import StatusCodes from '../utils/statusCode';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import IServiceMatch from '../interfaces/serviceMatch.interface';
import { IMatch, IMatchValidation } from '../interfaces/match.interface';

export default class MatchService implements IServiceMatch {
  #model: ModelStatic<Match>;
  #teamModel: ModelStatic<Team>;
  #validations: IMatchValidation;

  constructor(
    model: ModelStatic<Match>,
    teamModel: ModelStatic<Team>,
    validation: IMatchValidation,
  ) {
    this.#model = model;
    this.#teamModel = teamModel;
    this.#validations = validation;
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

  update = async (id: string, updateMatch: IMatch) => {
    this.#validations.validateUpdateMatch(updateMatch);
    const idExists = await this.#model.findByPk(id, { raw: true });
    if (!idExists) throw new NotFoundException('Match not found');
    await this.#model.update(updateMatch, { where: { id } });
    console.log(idExists, updateMatch);
    return { status: StatusCodes.OK, match: { ...idExists, ...updateMatch } as Match };
  };
}
