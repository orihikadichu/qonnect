'use strict';
module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  votes.associate = function(models) {
    votes.belongsTo(models.users, {foreignKey: 'user_id'});
    votes.belongsTo(models.questions, {foreignKey: 'question_id'});
    votes.belongsTo(models.comments, {foreignKey: 'comment_id'});
    votes.belongsTo(models.answers, {foreignKey: 'answer_id'});
  };
  return votes;
};
