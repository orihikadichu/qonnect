'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('vote_translations', 'status');
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('vote_translations', 'status', 
    {
        type: Sequelize.INTEGER,
        after: "comment_translation_id"
    }
    );
  },
};
