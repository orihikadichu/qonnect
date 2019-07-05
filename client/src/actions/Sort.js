import { createAction } from 'redux-actions';

// 文字列定数
export const UPDATE_CURRENT_SORT = Symbol('UPDATE_CURRENT_SORT');
export const updateCurrentSort = createAction(UPDATE_CURRENT_SORT);