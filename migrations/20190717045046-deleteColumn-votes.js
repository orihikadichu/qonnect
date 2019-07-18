'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('votes', 'status');
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('votes', 'status', 
    {
        type: Sequelize.INTEGER,
        after: "comment_id"
    }
    );
  },
};
