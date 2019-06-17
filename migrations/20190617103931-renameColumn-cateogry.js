'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('categories', 'category', 'intl_key');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('categories', 'intl_key', 'category');
  }
};
