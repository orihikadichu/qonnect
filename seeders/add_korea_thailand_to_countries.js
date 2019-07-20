'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'countries',
      [
        {
          name: '韓国',
          intl_key: 'countries.korea',
          created_at: '2019-06-01 00:00:00',
          updated_at: '2019-06-01 00:00:00'
        },
        {
          name: 'タイ',
          intl_key: 'countries.thailand',
          created_at: '2019-06-01 00:00:00',
          updated_at: '2019-06-01 00:00:00'
        },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('countries', null, {});
  }
};
