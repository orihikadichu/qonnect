'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('countries', 'intl_key', 
    {
        type: Sequelize.STRING,
        after: "name"
    }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('countries', 'intl_key');
  }
};
