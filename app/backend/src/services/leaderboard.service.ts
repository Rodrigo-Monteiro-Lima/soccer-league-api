import IServiceLeaderboard from '../interfaces/serviceLeaderboard.interface';
import sequelize from '../database/models';
import { TLeaderboard } from '../interfaces/leaderboard.interface';
import { all, away, home } from '../utils/query';

export default class LeaderboardService implements IServiceLeaderboard {
  getHome = async () => {
    const [results] = await sequelize.query(home) as TLeaderboard;
    // const leaderboard = await this.#model.findAll({
    //   attributes: [[col('team_name'), 'name'], [fn('SUM', literal(`CASE
    //   WHEN "home_team_goals" > "away_team_goals" THEN 3 WHEN "home_team_goals" = "away_team_goals"
    //   THEN 1 ELSE 0 END`)), 'totalPoints'], [fn('COUNT', col('*')), 'totalGames'],
    //   [fn('SUM', literal('CASE WHEN "home_team_goals" > "away_team_goals" THEN 1 ELSE 0 END')),
    //     'totalVictories'], [fn('SUM', literal(`CASE WHEN "home_team_goals" = "away_team_goals"
    //   THEN 1 ELSE 0 END`)), 'totalDraws'], [fn('SUM', literal(`CASE
    //    WHEN "home_team_goals" < "away_team_goals" THEN 1 ELSE 0 END`)), 'totalLosses'],
    //   [fn('SUM', col('home_team_goals')), 'goalsFavor'], [fn('SUM', col('away_team_goals')),
    //     'goalsOwn']],
    //   include: [{ model: Match,
    //     as: 'homeMatch',
    //     where: { inProgress: false },
    //     attributes: [] }],
    //   group: ['name'],
    //   raw: true });
    const leaderboard = results.map((team) => {
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency };
    });
    return leaderboard;
  };

  getAway = async () => {
    const [results] = await sequelize.query(away) as TLeaderboard;
    const leaderboard = results.map((team) => {
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency };
    });
    return leaderboard;
  };

  getAll = async () => {
    const [results] = await sequelize.query(all) as TLeaderboard;
    const leaderboard = results.map((team) => {
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency };
    });
    return leaderboard;
  };
}
