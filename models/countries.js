'use strict';
module.exports = (sequelize, DataTypes) => {
  const countries = sequelize.define('countries', {
    name: DataTypes.STRING,
    intl_key: DataTypes.STRING
  }, {
    underscored: true,
  });
  countries.associate = function(models) {
    // associations can be defined here
  };
  return countries;
};