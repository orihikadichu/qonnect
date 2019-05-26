import { createAction } from 'redux-actions';

// 文字列定数
export const FETCH_QUESTION_LIST = Symbol('FETCH_QUESTION_LIST');
export const FETCH_QUESTION = Symbol('FETCH_QUESTION');
export const POST_QUESTION_DATA = Symbol('POST_QUESTION_DATA');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_SINGLE_DATA_SUCCESS = Symbol('RECEIVE_SINGLE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');
export const UPDATE_CURRENT_TRANSLATE_LANGUAGE = Symbol('UPDATE_CURRENT_TRANSLATE_LANGUAGE');
export const SAVE_QUESTION_DATA = Symbol('SAVE_QUESTION_DATA');
export const UPDATED_QUESTION_DATA = Symbol('UPDATED_QUESTION_DATA');
export const DELETE_QUESTION = Symbol('DELETE_QUESTION');

export const fetchQuestionList = createAction(FETCH_QUESTION_LIST);
export const fetchQuestion = createAction(FETCH_QUESTION);
export const postQuestionData = createAction(POST_QUESTION_DATA);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveSingleDataSuccess = createAction(RECEIVE_SINGLE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);
export const updateCurrentTranslateLanguage = createAction(UPDATE_CURRENT_TRANSLATE_LANGUAGE);
export const saveQuestionData = createAction(SAVE_QUESTION_DATA);
export const updatedQuestionData = createAction(UPDATED_QUESTION_DATA);
export const deleteQuestion = createAction(DELETE_QUESTION);

