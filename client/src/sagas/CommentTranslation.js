import { takeEvery, call, put } from 'redux-saga/effects';
import {
  requestData,
  receiveDataSuccess,
  receiveSingleDataSuccess,
  receiveDataFailed,
  updatedSingleCommentTranslation
} from '../actions/CommentTranslation';
import {
  FETCH_COMMENT_TRANSLATION_LIST,
  FETCH_COMMENT_TRANSLATION,
  POST_COMMENT_TRANSLATION_DATA,
  SAVE_COMMENT_TRANSLATION_DATA,
  DELETE_COMMENT_TRANSLATION,
} from '../actions/CommentTranslation';
import * as api from './apis/CommentTranslations';
import { notifySuccess, notifyError } from './Util';

export function* handleFetchCommentTranslationList(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.fetchCommentTranslationList, action.payload);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    // isFetchingをfalse
    yield put(receiveDataFailed());
  }
};

export function* handleFetchCommentTranslationById(action) {
  try {
    const id  = action.payload;
    yield put(requestData());
    const payload = yield call(api.fetchCommentTranslation, id);
    yield put(receiveSingleDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
};

export function* postCommentTranslation(action) {
  try {
    const { comment_id } = action.payload;
    yield put(requestData());
    yield call(api.postCommentTranslationData, action.payload);
    const payload = yield call(api.fetchCommentTranslationList, comment_id);
    yield put(receiveDataSuccess(payload));
    const message = '翻訳を投稿しました。';
    yield put(notifySuccess(message));
  } catch (e) {
    yield put(receiveDataFailed());
    const message = '翻訳の投稿に失敗しました。';
    yield put(notifyError(message));
  }
}

export function* saveCommentTranslationData(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.saveCommentTranslationData, action.payload);
    const message = '翻訳を更新しました';
    yield put(notifySuccess(message));
    yield put(updatedSingleCommentTranslation(payload));
  } catch (e) {
    const message = '翻訳の更新に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* deleteCommentTranslation(action) {
  try {
    const { id, history } = action.payload;
    yield put(requestData());
    yield call(api.deleteCommentTranslation, action.payload);
    const message = '翻訳を削除しました';
    yield put(notifySuccess(message));
    const payload = yield call(api.fetchCommentTranslationList);
    yield put(receiveDataSuccess(payload));
    yield call(history.push, '/');
  } catch (e) {
    const message = '翻訳の削除に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

const commentTranslationSagas = [
  takeEvery(POST_COMMENT_TRANSLATION_DATA, postCommentTranslation),
  takeEvery(FETCH_COMMENT_TRANSLATION_LIST, handleFetchCommentTranslationList),
  takeEvery(FETCH_COMMENT_TRANSLATION, handleFetchCommentTranslationById),
  takeEvery(SAVE_COMMENT_TRANSLATION_DATA, saveCommentTranslationData),
  takeEvery(DELETE_COMMENT_TRANSLATION, deleteCommentTranslation),
];

export default commentTranslationSagas;
