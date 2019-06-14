'use strict';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import {
  getProfileImageName,
  getProfileImageFilePath,
  PROFILE_IMAGE_DIR,
} from '../server/users/util';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    mail: {
      type: DataTypes.STRING,
      field: 'mail',
      unieque: 'mail_unique'
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
        const imagePath = getProfileImageFilePath(this.get('id'));
        try {
          fs.statSync(__dirname + '/../client/build' + imagePath);
          return imagePath;
        } catch (e) {
          return PROFILE_IMAGE_DIR + 'blank-profile.png';
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

