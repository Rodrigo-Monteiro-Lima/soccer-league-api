'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'away_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');

  }
};
