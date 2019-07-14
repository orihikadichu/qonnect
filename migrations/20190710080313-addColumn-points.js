'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('points', 'translated', 
    {
        type: Sequelize.INTEGER,
        after: "user_id"
    }
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('points', 'translated')
  },
};
