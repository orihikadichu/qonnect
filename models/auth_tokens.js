'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth_tokens = sequelize.define('auth_tokens', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    new_mail: DataTypes.STRING,
    expired_datetime: DataTypes.DATE
  }, {
    underscored: true,
  });
  auth_tokens.associate = function(models) {
    // associations can be defined here
    auth_tokens.belongsTo(models.users, {foreignKey: 'user_id'});
  };
  return auth_tokens;
};
