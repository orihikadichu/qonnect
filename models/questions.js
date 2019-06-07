'use strict';

function vote_count(models, id){
  return new Promise((resolve, reject) => {
    models.findAndCountAll({ where:{ question_id: id}})
      .then((record) => {
        // console.log("record",record);
        return resolve(record.count);
      })
  });
}

module.exports = (sequelize, DataTypes) => {
  const votelist = sequelize.import('./votes');
  const questions = sequelize.define('questions', {
    content: { type: DataTypes.STRING } ,
    user_id: { type: DataTypes.INTEGER },
    translate_language_id: { type: DataTypes.INTEGER },
    country_id: { type: DataTypes.INTEGER },
    category_id: { type: DataTypes.INTEGER } ,
    //バーチャルカラム
    votesCounts: {
      type: DataTypes.VIRTUAL,
      get() {
        const voteCount = vote_count(votelist, 1);
        return voteCount;
      }
    }
  }, {
    underscored: true,
    // hooks: {
    //   afterFind: instances => {
    //     if (Array.isArray(instances)) {
    //       vote_count(votelist, 1)
    //         .then(data => {
    //           instances[0].dataValues.voteCount = data;
    //           return instances;
    //           // console.log("instances", instances[0]);
    //         });        
    //     } else {
    //       vote_count(votelist, 1)
    //         .then(data => {
    //           // instances.dataValues.someNewProp = data.someField
    //         });        
    //     }
    //   }
    // }  
  });
  questions.associate = function(models) {
    questions.belongsTo(models.users, {foreignKey: 'user_id'});
    questions.belongsTo(models.categories, {foreignKey: 'category_id'});
    questions.hasMany(models.answers, {foreignKey: 'question_id'});
    questions.hasMany(models.question_translations, {foreignKey: 'question_id'});
    questions.hasMany(models.votes, {foreignKey: 'question_id'});
    // questions.belongsTo(models.categories, {foreignKey: 'category_id'});
  };
  return questions;
};

// content: DataTypes.STRING,
// user_id: DataTypes.INTEGER,
// translate_language_id: DataTypes.INTEGER,
// country_id: DataTypes.INTEGER,
// category_id: DataTypes.INTEGER,