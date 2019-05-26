import { createAction } from 'redux-actions';

// 文字列定数
export const FETCH_ANSWER_TRANSLATION_LIST = Symbol('FETCH_ANSWER_TRANSLATION_LIST');
export const FETCH_ANSWER_TRANSLATION = Symbol('FETCH_ANSWER_TRANSLATION');
export const POST_ANSWER_TRANSLATION_DATA = Symbol('POST_ANSWER_TRANSLATION_DATA');
export const SAVE_ANSWER_TRANSLATION_DATA = Symbol('SAVE_ANSWER_TRANSLATION_DATA');
export const DELETE_ANSWER_TRANSLATION = Symbol('DELETE_ANSWER_TRANSLATION');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_SINGLE_DATA_SUCCESS = Symbol('RECEIVE_SINGLE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');
export const UPDATED_SINGLE_ANSWER_TRANSLATION = Symbol('UPDATED_SINGLE_ANSWER_TRANSLATION');


export const fetchAnswerTranslationList = createAction(FETCH_ANSWER_TRANSLATION_LIST);
export const fetchAnswerTranslation = createAction(FETCH_ANSWER_TRANSLATION);
export const postAnswerTranslationData = createAction(POST_ANSWER_TRANSLATION_DATA);
export const saveAnswerTranslationData = createAction(SAVE_ANSWER_TRANSLATION_DATA);
export const deleteAnswerTranslation = createAction(DELETE_ANSWER_TRANSLATION);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveSingleDataSuccess = createAction(RECEIVE_SINGLE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);
export const updatedSingleAnswerTranslation = createAction(UPDATED_SINGLE_ANSWER_TRANSLATION);

