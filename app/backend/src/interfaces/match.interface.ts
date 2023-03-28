export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface INewMatch extends IMatch {
  homeTeamId: number,
  awayTeamId: number,
}

export interface IMatchValidation {
  validateUpdateMatch: (b: IMatch) => void,
  validateCreateMatch: (b: INewMatch) => void,
}
