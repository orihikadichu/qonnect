'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
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
          type: Sequelize.STRING
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
          type: Sequelize.INTEGER
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
      queryInterface.addIndex(
        'users',
        ['mail'],
        {
          indexName: 'mail_unique',
          indicesType: 'UNIQUE'
        }
      ),
      queryInterface.addIndex(
        'users',
        ['mail'],
        {
          indexName: 'mail_index'
        }
      )
    ];
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
