'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    user_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER,
    translate_language_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    underscored: true,
  });
  comments.associate = function(models) {
    comments.belongsTo(models.users, {foreignKey: 'user_id'});
    comments.belongsTo(models.answers, {foreignKey: 'answer_id'});
    comments.hasMany(models.comment_translations, {foreignKey: 'comment_id'});
  };
  return comments;
};
