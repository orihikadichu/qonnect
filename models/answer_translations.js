'use strict';
module.exports = (sequelize, DataTypes) => {
  const answer_translations = sequelize.define('answer_translations', {
    user_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    translate_language_id: DataTypes.INTEGER,
    translation_link: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['answer_id']),
      get: function() {
        const id = this.get('answer_id');
        return `/answer_translations/${id}`;
      }
    }
  }, {
    underscored: true,
  });
  answer_translations.associate = function(models) {
    answer_translations.belongsTo(models.users, {foreignKey: 'user_id'});
    answer_translations.belongsTo(models.answers, {foreignKey: 'answer_id'});
    answer_translations.hasMany(models.vote_translations, {foreignKey: 'answer_translation_id'});   
  };
  return answer_translations;
};
