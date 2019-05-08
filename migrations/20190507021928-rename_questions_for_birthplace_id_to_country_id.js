'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('questions', 'for_birthplace_id', 'country_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('questions', 'country_id', 'for_birthplace_id');
  }
};
