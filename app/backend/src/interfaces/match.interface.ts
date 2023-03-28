export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchValidation {
  validateUpdateMatch: (b: IMatch) => void,
}
