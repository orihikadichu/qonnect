'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories',
    [{
      name: '漫画・アニメ',
      intl_key: 'categories.comic_anime',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      name:  '文化',
      intl_key: 'categories.culture',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      name:  '観光',
      intl_key: 'categories.tourism',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      name: '音楽',
      intl_key: 'categories.music',
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
