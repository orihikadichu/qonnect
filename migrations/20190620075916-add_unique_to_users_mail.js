'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'users',
      ['mail'],
      {
        indexName: 'users_mail_index',
        indicesType: 'UNIQUE'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('users', 'users_mail_index');
  }
};
