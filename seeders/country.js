'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('countries',
    [{
      name: '日本',
      intl_key: 'countries.japan',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      name: 'アメリカ合衆国',
      intl_key: 'countries.usa',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    },
    {
      name: '東南アジア',
      intl_key: 'countries.southeastasia',
      created_at: '2019-06-01 00:00:00',
      updated_at: '2019-06-01 00:00:00'
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('countries', null, {});
  }
};
