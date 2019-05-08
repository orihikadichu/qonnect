'use strict';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    mail: {
      type: DataTypes.STRING,
      field: 'mail'
    },
    password: {
      type: DataTypes.STRING,
      field: 'password'
    },
    wallet_address: {
      type: DataTypes.STRING,
      field: 'wallet_address'
    },
    country_id: {
      type: DataTypes.INTEGER,
      field: 'country_id'
    },
    profile: {
      type: DataTypes.TEXT,
      field: 'profile'
    },
    image_path: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['id']),
      get: function() {
        const imagePath = getProfileImagePath(this.get('id'));
        try {
          fs.statSync(__dirname + '/../client/public' + imagePath);
          return imagePath;
        } catch (e) {
          return '/image/blank-profile.png';
        }
      }
    }
  }, {
    underscored: true,
    sequelize
  });
  users.associate = function(models) {
    users.hasMany(models.questions, {foreignKey: 'user_id'});
    users.hasMany(models.answers, {foreignKey: 'user_id'});
    users.hasMany(models.comments, {foreignKey: 'user_id'});
    users.belongsTo(models.countries, {foreignKey: 'country_id'});
  };
  return users;
};

const getProfileImageName = (userId) => {
  const sha = crypto.createHash('sha512');
  sha.update(String(userId));
  return sha.digest('hex') + '.png';
};

const getProfileImagePath = (userId) => {
  return '/image/' + getProfileImageName(userId);
};
