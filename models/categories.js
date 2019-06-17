'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: DataTypes.STRING,
    intl_key: DataTypes.STRING
  }, {
    underscored: true,
  });
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};