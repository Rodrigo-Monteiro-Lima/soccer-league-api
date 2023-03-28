import { IMatch, IMatchValidation } from '../../interfaces/match.interface';
import UnprocessableContentExeception from '../../errors/UnprocessableContentExeception';
import { updateMatchSchema } from './schemas';

export default class MatchValidations implements IMatchValidation {
  validateUpdateMatch = (match: IMatch) => {
    const { error } = updateMatchSchema.validate(match);
    if (error) throw new UnprocessableContentExeception(error?.message);
  };
}
