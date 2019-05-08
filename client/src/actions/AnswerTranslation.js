import { createAction } from 'redux-actions';

// 文字列定数
export const CHANGE_FORM_CONTENT = Symbol('CHANGE_FORM_CONTENT');
export const CHANGE_FORM_LANGUAGE = Symbol('CHANGE_FORM_LANGUAGE');
export const FETCH_ANSWER_TRANSLATION_LIST = Symbol('FETCH_ANSWER_TRANSLATION_LIST');
export const FETCH_QUESTION = Symbol('FETCH_QUESTION');
export const POST_ANSWER_TRANSLATION_DATA = Symbol('POST_ANSWER_TRANSLATION_DATA');
export const INITIALIZE_FORM = Symbol('INITIALIZE_FORM');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_SINGLE_DATA_SUCCESS = Symbol('RECEIVE_SINGLE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');

export const changeFormContent = createAction(CHANGE_FORM_CONTENT);
export const changeFormLanguage = createAction(CHANGE_FORM_LANGUAGE);
export const fetchAnswerTranslationList = createAction(FETCH_ANSWER_TRANSLATION_LIST);
export const fetchAnswerTranslation = createAction(FETCH_QUESTION);
export const postAnswerTranslationData = createAction(POST_ANSWER_TRANSLATION_DATA);
export const initializeForm = createAction(INITIALIZE_FORM);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveSingleDataSuccess = createAction(RECEIVE_SINGLE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);

