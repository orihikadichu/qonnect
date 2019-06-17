'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('categories', 'name', 
    {
        type: Sequelize.STRING,
        after: "id"
    }
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('categories', 'name');
  },
};