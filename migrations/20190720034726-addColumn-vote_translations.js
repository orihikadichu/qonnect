'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('vote_translations', 'voted_user_id', 
    {
        type: Sequelize.INTEGER,
        after: "user_id"
    }
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('vote_translations', 'voted_user_id')
  },
};
