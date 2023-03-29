import { IMatch, IMatchValidation, INewMatch } from '../../interfaces/match.interface';
import UnprocessableContentExeception from '../../errors/UnprocessableContentExeception';
import { updateMatchSchema, newMatchSchema } from './schemas';

export default class MatchValidations implements IMatchValidation {
  validateUpdateMatch = (match: IMatch) => {
    const { error } = updateMatchSchema.validate(match);
    if (error) throw new UnprocessableContentExeception(error.message as string);
  };

  validateCreateMatch = (match: INewMatch) => {
    const { error } = newMatchSchema.validate(match);
    if (error) throw new UnprocessableContentExeception(error.message as string);
    const { awayTeamId, homeTeamId } = match;
    if (awayTeamId === homeTeamId) {
      throw new UnprocessableContentExeception(
        'It is not possible to create a match with two equal teams',
      );
    }
  };
}
