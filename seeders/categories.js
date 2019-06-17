'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', 
    [{
      category: '漫画・アニメ',
      created_at: '2019-06-01 00:00:00', 
      updated_at: '2019-06-01 00:00:00'
    },
    {
      category: '文化',
      created_at: '2019-06-01 00:00:00', 
      updated_at: '2019-06-01 00:00:00'
    },
    {
      category: '観光',
      created_at: '2019-06-01 00:00:00', 
      updated_at: '2019-06-01 00:00:00'
    },
    {
      category: '音楽',
      created_at: '2019-06-01 00:00:00', 
      updated_at: '2019-06-01 00:00:00'
    },
    ]
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};