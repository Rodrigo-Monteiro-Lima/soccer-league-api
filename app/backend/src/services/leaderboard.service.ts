// import { ModelStatic, fn, col, literal } from 'sequelize';
import IServiceLeaderboard from '../interfaces/serviceLeaderboard.interface';
import sequelize from '../database/models';
import { TLeaderboard } from '../interfaces/leaderboard.interface';

export default class LeaderboardService implements IServiceLeaderboard {
  // #model: ModelStatic<Team>;
  // #matchModel: ModelStatic<Match>;

  // constructor(model: ModelStatic<Team>, matchModel: ModelStatic<Match>){
  //   this.#model = model;
  //   this.#matchModel = matchModel;
  // }

  getHome = async () => {
    const [results] = await sequelize.query(`
    SELECT t.team_name AS name, SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
    WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalPoints, 
    COUNT(*) AS totalGames, SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
    SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
    SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
    SUM(home_team_goals) AS goalsFavor, SUM(away_team_goals) AS goalsOwn,
    (SUM(home_team_goals) - SUM(away_team_goals)) AS goalsBalance
    FROM teams AS t JOIN matches AS m ON m.home_team_id = t.id 
    AND m.in_progress IS FALSE GROUP BY name 
    ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;
    `) as TLeaderboard;
    // const leaderboard = await this.#teamModel.findAll({
    //   attributes: [[col('team_name'), 'name'], [
    //       fn('SUM',literal('CASE WHEN "home_team_goals" > "away_team_goals" THEN 3 '
    //        + 'WHEN "home_team_goals" = "away_team_goals" THEN 1 ' + 'ELSE 0 END')),
    //       'totalPoints'
    //     ],[fn('COUNT', col('*')),'totalGames'],[fn('SUM', literal(
    //           'CASE WHEN "home_team_goals" > "away_team_goals" THEN 1 ELSE 0 END')),
    //       'totalVictories'],
    //     [fn('SUM', literal(
    //           'CASE WHEN "home_team_goals" = "away_team_goals" THEN 1 ELSE 0 END')),
    //       'totalDraws'],[fn('SUM', literal(
    //           'CASE WHEN "home_team_goals" < "away_team_goals" THEN 1 ELSE 0 END')),
    //       'totalLosses'],[fn('SUM', col('home_team_goals')),'goalsFavor'],
    //     [fn('SUM', col('away_team_goals')),'goalsOwn'],],
    //   include: [{model: Match, as: 'homeMatch', where: { in_progress: false },
    //   attributes: []}], // group: ['id']
    //   group: ['name'], raw: true });
    const leaderboard = results.map((team) => {
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency };
    });
    return leaderboard;
  };
}
