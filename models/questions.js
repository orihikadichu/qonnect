'use strict';
module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    translate_language_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  questions.associate = function(models) {
    questions.belongsTo(models.users, {foreignKey: 'user_id'});
    questions.hasMany(models.answers, {foreignKey: 'question_id'});
    questions.hasMany(models.question_translations, {foreignKey: 'question_id'});
    questions.hasMany(models.votes, {foreignKey: 'question_id'});
    // questions.belongsTo(models.categories, {foreignKey: 'category_id'});
  };
  return questions;
};
