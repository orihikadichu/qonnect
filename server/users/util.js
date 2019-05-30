'use strict';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const PROFILE_PREFIX = 'profile_';
export const PROFILE_IMAGE_DIR = '/image/profile/';

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
