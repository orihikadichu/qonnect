'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    category: DataTypes.STRING
  }, {
    underscored: true,
  });
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};