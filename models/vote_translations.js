'use strict';
module.exports = (sequelize, DataTypes) => {
  const vote_translations = sequelize.define('vote_translations', {
    user_id: DataTypes.INTEGER,
    question_translation_id: DataTypes.INTEGER,
    answer_translation_id: DataTypes.INTEGER,
    comment_translation_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    underscored: true,
    indexes: [ 
      { 
       unique: true, 
       fields: ['user_id', 'question_translation_id'] 
      },
      { 
        unique: true, 
        fields: ['user_id', 'answer_translation_id'] 
       },
       { 
        unique: true, 
        fields: ['user_id', 'comment_translation_id'] 
       },
     ]
  });
  vote_translations.associate = function(models) {
    vote_translations.belongsTo(models.users, {foreignKey: 'user_id'});
    vote_translations.belongsTo(models.questions, {foreignKey: 'question_translation_id'});
    vote_translations.belongsTo(models.comments, {foreignKey: 'comment_translation_id'});
    vote_translations.belongsTo(models.answers, {foreignKey: 'answer_translation_id'});
  };
  return vote_translations;
};