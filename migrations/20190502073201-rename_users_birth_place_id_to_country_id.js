'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'birthplace_id', 'country_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'country_id', 'birthplace_id');
  }
};
