'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        mail: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING
        },
        wallet_address: {
          allowNull: true,
          type: Sequelize.STRING
        },
        birthplace_id: {
          allowNull: true,
          type: Sequelize.INTEGER
        },
        profile: {
          allowNull: true,
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
