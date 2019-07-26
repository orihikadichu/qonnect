'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('action_types',
    [
    {
      type: 'voted',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('action_types', null, {});
  }
};