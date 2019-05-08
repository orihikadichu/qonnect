import { createAction } from 'redux-actions';

// 文字列定数
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');
export const FETCH_SINGLE_COMMENT = Symbol('FETCH_SINGLE_COMMENT');
export const POST_COMMENT = Symbol('POST_COMMENT');
export const UPDATE_COMMENT = Symbol('UPDATE_COMMENT');
export const UPDATED_COMMENT_DATA = Symbol('UPDATED_COMMENT_DATA');
export const UPDATED_SINGLE_COMMENT_DATA = Symbol('UPDATED_SINGLE_COMMENT_DATA');
export const SAVE_COMMENT_DATA = Symbol('SAVE_COMMENT_DATA');
export const DELETE_COMMENT = Symbol('DELETE_COMMENT');

export const requestData = createAction(REQUEST_DATA);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);
export const postComment = createAction(POST_COMMENT);
export const fetchSingleComment = createAction(FETCH_SINGLE_COMMENT);
export const updateComment = createAction(UPDATE_COMMENT);
export const updatedCommentData = createAction(UPDATED_COMMENT_DATA);
export const updatedSingleCommentData = createAction(UPDATED_SINGLE_COMMENT_DATA);
export const deleteComment = createAction(DELETE_COMMENT);
export const saveCommentData = createAction(SAVE_COMMENT_DATA);
