import { createAction } from 'redux-actions';

// 文字列定数
export const CHANGE_QUESTION_LIST_LANGUAGE = Symbol('CHANGE_QUESTION_LIST_LANGUAGE');
export const FETCH_QUESTION_LIST = Symbol('FETCH_QUESTION_LIST');

export const FETCH_NOT_TRANSLATED = Symbol('FETCH_NOT_TRANSLATED');

export const FETCH_QUESTION = Symbol('FETCH_QUESTION');
export const POST_QUESTION_DATA = Symbol('POST_QUESTION_DATA');
export const INITIALIZE_FORM = Symbol('INITIALIZE_FORM');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_SINGLE_DATA_SUCCESS = Symbol('RECEIVE_SINGLE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');

export const changeQuestionListLanguage = createAction(CHANGE_QUESTION_LIST_LANGUAGE);
export const fetchQuestionList = createAction(FETCH_QUESTION_LIST);

export const fetchNotTranslated = createAction(FETCH_NOT_TRANSLATED);

export const fetchQuestion = createAction(FETCH_QUESTION);
export const postQuestionData = createAction(POST_QUESTION_DATA);
export const initializeForm = createAction(INITIALIZE_FORM);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveSingleDataSuccess = createAction(RECEIVE_SINGLE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);

