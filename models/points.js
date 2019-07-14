'use strict';
module.exports = (sequelize, DataTypes) => {
  const points = sequelize.define('points', {
    user_id: DataTypes.INTEGER,
    translated: DataTypes.INTEGER,
    action_type_id: DataTypes.INTEGER,
    target_id: DataTypes.INTEGER,
    point: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  points.associate = function(models) {
    points.belongsTo(models.users, {foreignKey: 'user_id'});
    points.belongsTo(models.action_types, {foreignKey: 'action_type_id'});
    // points.belongsTo(models.quesitons, {foreignKey: 'target_id'});
    // points.belongsTo(models.answers, {foreignKey: 'target_id'});
  };
  return points;
};