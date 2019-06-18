'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('translate_languages', 'intl_key', 
    {
        type: Sequelize.STRING,
        after: "language"
    }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('translate_languages', 'intl_key');
  }
};
