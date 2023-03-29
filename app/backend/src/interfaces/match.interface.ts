import Match from '../database/models/match.model';

export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface INewMatch extends IMatch {
  homeTeamId: number,
  awayTeamId: number,
}

export interface IMatchTeams extends Match {
  homeTeam: {
    teamName: string,
  },
  awayTeam: {
    teamName: string,
  }
}

export interface IMatchValidation {
  validateUpdateMatch: (b: IMatch) => void,
  validateCreateMatch: (b: INewMatch) => void,
}
