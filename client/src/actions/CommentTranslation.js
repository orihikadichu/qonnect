import { createAction } from 'redux-actions';

// 文字列定数
export const FETCH_COMMENT_TRANSLATION_LIST = Symbol('FETCH_COMMENT_TRANSLATION_LIST');
export const FETCH_COMMENT_TRANSLATION = Symbol('FETCH_COMMENT_TRANSLATION');
export const POST_COMMENT_TRANSLATION_DATA = Symbol('POST_COMMENT_TRANSLATION_DATA');
export const SAVE_COMMENT_TRANSLATION_DATA = Symbol('SAVE_COMMENT_TRANSLATION_DATA');
export const DELETE_COMMENT_TRANSLATION = Symbol('DELETE_COMMENT_TRANSLATION');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_SINGLE_DATA_SUCCESS = Symbol('RECEIVE_SINGLE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');
export const UPDATED_SINGLE_COMMENT_TRANSLATION = Symbol('UPDATED_SINGLE_COMMENT_TRANSLATION');


export const fetchCommentTranslationList = createAction(FETCH_COMMENT_TRANSLATION_LIST);
export const fetchCommentTranslation = createAction(FETCH_COMMENT_TRANSLATION);
export const postCommentTranslationData = createAction(POST_COMMENT_TRANSLATION_DATA);
export const saveCommentTranslationData = createAction(SAVE_COMMENT_TRANSLATION_DATA);
export const deleteCommentTranslation = createAction(DELETE_COMMENT_TRANSLATION);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveSingleDataSuccess = createAction(RECEIVE_SINGLE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);
export const updatedSingleCommentTranslation = createAction(UPDATED_SINGLE_COMMENT_TRANSLATION);

