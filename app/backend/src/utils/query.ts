const home = `SELECT t.team_name AS name, SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalPoints,
COUNT(*) AS totalGames, SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
SUM(home_team_goals) AS goalsFavor, SUM(away_team_goals) AS goalsOwn,
(SUM(home_team_goals) - SUM(away_team_goals)) AS goalsBalance
FROM teams AS t JOIN matches AS m ON m.home_team_id = t.id
AND m.in_progress IS FALSE GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;
`;

const away = `SELECT t.team_name AS name, SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3
WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) AS totalPoints,
COUNT(*) AS totalGames, SUM(IF(m.away_team_goals > m.home_team_goals, 1, 0)) AS totalVictories,
SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0)) AS totalDraws,
SUM(IF(m.away_team_goals < m.home_team_goals, 1, 0)) AS totalLosses,
SUM(away_team_goals) AS goalsFavor, SUM(home_team_goals) AS goalsOwn,
(SUM(away_team_goals) - SUM(home_team_goals)) AS goalsBalance
FROM teams AS t JOIN matches AS m ON m.away_team_id = t.id AND m.in_progress IS FALSE 
GROUP BY name ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;
`;

const all = `
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
SUM(CASE WHEN m.away_team_id = t.id THEN m.home_team_goals ELSE 0 END) AS goalsOwn,
((SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals ELSE 0 END) + 
SUM(CASE WHEN m.away_team_id = t.id THEN m.away_team_goals ELSE 0 END)) -
(SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals ELSE 0 END) + 
SUM(CASE WHEN m.away_team_id = t.id THEN m.home_team_goals ELSE 0 END))) as goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.teams t JOIN TRYBE_FUTEBOL_CLUBE.matches m 
ON (t.id = m.home_team_id OR t.id = m.away_team_id) AND m.in_progress IS FALSE GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;
`;

export { home, away, all };
