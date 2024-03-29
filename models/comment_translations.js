'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment_translations = sequelize.define('comment_translations', {
    user_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    translate_language_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    translation_link: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['comment_id']),
      get: function() {
        const id = this.get('comment_id');
        return `/comment_translations/${id}`;
      }
    }
  }, {
    underscored: true,
  });
  comment_translations.associate = function(models) {
    comment_translations.belongsTo(models.users, {foreignKey: 'user_id'});
    comment_translations.belongsTo(models.comments, {foreignKey: 'comment_id'});
    comment_translations.hasMany(models.vote_translations, {foreignKey: 'comment_translation_id'});
  };
  return comment_translations;
};
