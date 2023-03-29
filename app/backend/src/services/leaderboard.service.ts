// import { ModelStatic, fn, col, literal } from 'sequelize';
import IServiceLeaderboard from '../interfaces/serviceLeaderboard.interface';
import sequelize from '../database/models';
import { TLeaderboard } from '../interfaces/leaderboard.interface';

const query = `
SELECT t.team_name AS name, SUM(CASE WHEN m.away_team_id = t.id 
AND m.away_team_goals > m.home_team_goals THEN 3 WHEN m.home_team_id = t.id 
AND m.home_team_goals > m.away_team_goals THEN 3 WHEN m.away_team_goals = m.home_team_goals 
THEN 1 ELSE 0 END) AS totalPoints, COUNT(*) AS totalGames,    SUM(IF(m.away_team_id = t.id AND
m.away_team_goals > m.home_team_goals, 1, 0)) + SUM(IF(m.home_team_id = t.id 
AND m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0))  AS totalDraws,
SUM(IF(m.away_team_id = t.id AND m.away_team_goals < m.home_team_goals, 1, 0)) + 
SUM(IF(m.home_team_id = t.id AND m.home_team_goals < m.away_team_goals, 1, 0))AS totalLosses,
SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals ELSE 0 END) + 
SUM(CASE WHEN m.away_team_id = t.id THEN m.away_team_goals ELSE 0 END) AS goalsFavor,
SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals ELSE 0 END) + 
SUM(CASE WHEN m.away_team_id = t.id THEN m.home_team_goals ELSE 0 END) AS goalsOwn
FROM TRYBE_FUTEBOL_CLUBE.teams t JOIN TRYBE_FUTEBOL_CLUBE.matches m 
ON (t.id = m.home_team_id OR t.id = m.away_team_id) AND m.in_progress IS FALSE GROUP BY name;
`;

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

  getAway = async () => {
    const [results] = await sequelize.query(`
    SELECT t.team_name AS name, SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3
    WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) AS totalPoints,
    COUNT(*) AS totalGames, SUM(IF(m.away_team_goals > m.home_team_goals, 1, 0)) AS totalVictories,
    SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0)) AS totalDraws,
    SUM(IF(m.away_team_goals < m.home_team_goals, 1, 0)) AS totalLosses,
    SUM(away_team_goals) AS goalsFavor, SUM(home_team_goals) AS goalsOwn,
    (SUM(away_team_goals) - SUM(home_team_goals)) AS goalsBalance
    FROM teams AS t JOIN matches AS m ON m.away_team_id = t.id AND m.in_progress IS FALSE 
    GROUP BY name ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;
    `) as TLeaderboard;
    const leaderboard = results.map((team) => {
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency };
    });
    return leaderboard;
  };

  getAll = async () => {
    const [results] = await sequelize.query(query) as TLeaderboard;
    const leaderboard = results.map((team) => {
      const goalsBalance = team.goalsFavor - team.goalsOwn;
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, goalsBalance, efficiency };
    }).sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
    return leaderboard;
  };
}
