'use strict';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const PROFILE_PREFIX = 'profile_';
export const PROFILE_IMAGE_DIR = '/image/profile/';
export const SECRET_KEY = 'Eg2fTPSp6attfKcC6bsNbWkwsn6R4v';

export const getProfileImageName = (userId) => {
  const profileImageName = PROFILE_PREFIX + String(userId);
  const profileImageHashName = getHashName(profileImageName);
  return profileImageHashName + '.png';
};

export const getProfileImageFilePath = (userId) => {
  return getProfileImageDir(userId) + getProfileImageName(userId);
};

export const getHashName = (name) => {
  const sha = crypto.createHash('sha512');
  sha.update(String(name));
  return sha.digest('hex');
};

export const getProfileImageDir = (userId) => {
  const userIdHash = getHashName(userId);
  return PROFILE_IMAGE_DIR + userIdHash + '/';
};

export const getPasswordHash = (plainPassword) => {
  const saltRounds = 10;
  return bcrypt.hashSync(plainPassword, saltRounds);
};

export const getJwt = (params) => {
  return jwt.sign(params, SECRET_KEY);
};
