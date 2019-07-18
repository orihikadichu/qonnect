'use strict';

export const isEmptyObject = (obj) => {
  if (typeof obj === 'undefined') {
    return true;
  }
  return !Object.keys(obj).length;
}
