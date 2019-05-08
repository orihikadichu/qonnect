import { createAction } from 'redux-actions';

// 文字列定数
export const CHANGE_ANSWER_FORM_CONTENT = Symbol('CHANGE_ANSWER_FORM_CONTENT');
export const FETCH_ANSWER_LIST = Symbol('FETCH_ANSWER_LIST');
export const FETCH_ANSWER = Symbol('FETCH_ANSWER');
export const POST_ANSWER_DATA = Symbol('POST_ANSWER_DATA');
export const INITIALIZE_FORM = Symbol('INITIALIZE_FORM');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_SINGLE_DATA_SUCCESS = Symbol('RECEIVE_SINGLE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');
export const SAVE_ANSWER_DATA = Symbol('SAVE_ANSWER_DATA');
export const DELETE_ANSWER = Symbol('DELETE_ANSWER');

export const changeAnswerFormContent = createAction(CHANGE_ANSWER_FORM_CONTENT);
export const fetchAnswerList = createAction(FETCH_ANSWER_LIST);
export const fetchAnswer = createAction(FETCH_ANSWER);
export const postAnswerData = createAction(POST_ANSWER_DATA);
export const initializeForm = createAction(INITIALIZE_FORM);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveSingleDataSuccess = createAction(RECEIVE_SINGLE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);
export const saveAnswerData = createAction(SAVE_ANSWER_DATA);
export const deleteAnswer = createAction(DELETE_ANSWER);
