import ILeaderboard from './leaderboard.interface';

export default interface IServiceLeaderboard {
  getHome(): Promise<ILeaderboard[]>,
  getAway(): Promise<ILeaderboard[]>,
  getAll(): Promise<ILeaderboard[]>,
}
