import { createAction } from 'redux-actions';

// 文字列定数
export const FETCH_QUESTION_TRANSLATION_LIST = Symbol('FETCH_QUESTION_TRANSLATION_LIST');
export const FETCH_QUESTION_TRANSLATION = Symbol('FETCH_QUESTION_TRANSLATION');
export const POST_QUESTION_TRANSLATION_DATA = Symbol('POST_QUESTION_TRANSLATION_DATA');
export const INITIALIZE_FORM = Symbol('INITIALIZE_FORM');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_SINGLE_DATA_SUCCESS = Symbol('RECEIVE_SINGLE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');
export const UPDATED_SINGLE_QUESTION_TRANSLATION = Symbol('UPDATED_SINGLE_QUESTION_TRANSLATION');
export const SAVE_QUESTION_TRANSLATION_DATA = Symbol('SAVE_QUESTION_TRANSLATION_DATA');
export const DELETE_QUESTION_TRANSLATION = Symbol('DELETE_QUESTION_TRANSLATION');


export const fetchQuestionTranslationList = createAction(FETCH_QUESTION_TRANSLATION_LIST);
export const fetchQuestionTranslation = createAction(FETCH_QUESTION_TRANSLATION);
export const postQuestionTranslationData = createAction(POST_QUESTION_TRANSLATION_DATA);
export const initializeForm = createAction(INITIALIZE_FORM);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveSingleDataSuccess = createAction(RECEIVE_SINGLE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);
export const updatedSingleQuestionTranslation = createAction(UPDATED_SINGLE_QUESTION_TRANSLATION);
export const saveQuestionTranslationData = createAction(SAVE_QUESTION_TRANSLATION_DATA);
export const deleteQuestionTranslation = createAction(DELETE_QUESTION_TRANSLATION);

