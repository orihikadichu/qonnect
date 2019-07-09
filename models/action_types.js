'use strict';
module.exports = (sequelize, DataTypes) => {
  const action_types = sequelize.define('action_types', {
    type: DataTypes.STRING
  }, {
    underscored: true,
  });
  action_types.associate = function(models) {
    action_types.hasMany(models.points, {foreignKey: 'action_type_id'});
  };
  return action_types;
};