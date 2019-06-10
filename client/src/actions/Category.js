import { createAction } from 'redux-actions';

// 文字列定数
export const UPDATE_CURRENT_CATEGORY = Symbol('UPDATE_CURRENT_CATEGORY');
export const updateCurrentCategory = createAction(UPDATE_CURRENT_CATEGORY);