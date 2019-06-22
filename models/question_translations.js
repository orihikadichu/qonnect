'use strict';
module.exports = (sequelize, DataTypes) => {
  const question_translations = sequelize.define('question_translations', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    translate_language_id: DataTypes.INTEGER,
    translation_link: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['question_id']),
      get: function() {
        const id = this.get('question_id');
        return `/question_translations/${id}`;
      }
    }
  }, {
    underscored: true,
  });
  question_translations.associate = function(models) {
    question_translations.belongsTo(models.users, {foreignKey: 'user_id'});
    question_translations.belongsTo(models.questions, {foreignKey: 'question_id'});
    question_translations.hasMany(models.vote_translations, {foreignKey: 'question_translation_id'});
  };
  return question_translations;
};
