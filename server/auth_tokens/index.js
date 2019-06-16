'use strict';
import dayjs from 'dayjs';
import { getHashName } from '../users/util';

export const getTokenData = (user_id) => {
  const token = getHashName(user_id);
  const expired_datetime = dayjs()
        .add(1, 'day')
        .format('YYYY-MM-DD HH:mm:ss');

  return {
    user_id,
    token,
    expired_datetime
  };
};
