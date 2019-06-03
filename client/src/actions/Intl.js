import { createAction } from 'redux-actions';

// 文字列定数
export const UPDATE_CURRENT_LANGUAGE = Symbol('UPDATE_CURRENT_LANGUAGE');


export const updateCurrentLanguage = createAction(UPDATE_CURRENT_LANGUAGE);
