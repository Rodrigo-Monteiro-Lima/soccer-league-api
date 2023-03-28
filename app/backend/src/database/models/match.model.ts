import {
  INTEGER,
  Model,
  BOOLEAN,
} from 'sequelize';
import db from '.';
import Team from './team.model';

class Match extends Model {
  declare readonly id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeMatch' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayMatch' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Match;
