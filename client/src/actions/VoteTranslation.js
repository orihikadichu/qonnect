import { createAction } from 'redux-actions';

// 文字列定数
export const POST_VOTE = Symbol('POST_VOTE');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');

//createAction(FETCH_QUESTION_LIST)はFETCH_QUESTION_LISTという名前でアクションを発火させる。
export const postVote = createAction(POST_VOTE);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);