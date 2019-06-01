'use strict';
module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    translate_language_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  answers.associate = function(models) {
    answers.belongsTo(models.users, {foreignKey: 'user_id'});
    answers.belongsTo(models.questions, {foreignKey: 'question_id'});
    answers.hasMany(models.comments, {foreignKey: 'answer_id'});
    answers.hasMany(models.answer_translations, {foreignKey: 'answer_id'});
    answers.hasMany(models.votes, {foreignKey: 'answer_id'});
  };
  return answers;
};
