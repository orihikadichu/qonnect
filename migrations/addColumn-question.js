'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('questions', 'category_id', 
    {
        type: Sequelize.INTEGER,
        after: "country_id"
    }
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('questions', 'category_id');
  },
};
