'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'comments',
      'translate_language_id',
      {
        type: Sequelize.INTEGER,
        after: "answer_id"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'comments',
      'translate_language_id',
    );
  }
};
