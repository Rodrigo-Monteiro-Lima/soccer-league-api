import ILeaderboard from './leaderboard.interface';

export default interface IServiceLeaderboard {
  getHome(): Promise<ILeaderboard[]>,
}
