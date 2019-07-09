'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('action_types',
    [{
      type: 'question',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      type:  'answer',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      type:  'comment',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      type: 'translation',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      type: 'correction',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      type: 'vote',
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