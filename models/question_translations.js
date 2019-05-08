'use strict';
module.exports = (sequelize, DataTypes) => {
  const question_translations = sequelize.define('question_translations', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    translate_language_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  question_translations.associate = function(models) {
    question_translations.belongsTo(models.users, {foreignKey: 'user_id'});
    question_translations.belongsTo(models.questions, {foreignKey: 'question_id'});
  };
  return question_translations;
};
