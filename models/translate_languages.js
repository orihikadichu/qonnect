'use strict';
module.exports = (sequelize, DataTypes) => {
  const translate_languages = sequelize.define('translate_languages', {
    language: DataTypes.STRING
  }, {
    underscored: true,
  });
  translate_languages.associate = function(models) {
    // associations can be defined here
  };
  return translate_languages;
};