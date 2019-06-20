'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('translate_languages', 
    [{
      language: '日本語',
      intl_key: 'languages.japan',
      created_at: '2019-06-01 00:00:00', 
      updated_at: '2019-06-01 00:00:00'
    },
    {
      language: '英語',
      intl_key: 'languages.america',
      created_at: '2019-06-01 00:00:00', 
      updated_at: '2019-06-01 00:00:00'
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('translate_languages', null, {});
  }
};
