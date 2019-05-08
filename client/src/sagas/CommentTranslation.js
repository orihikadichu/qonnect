import { takeEvery, call, put } from 'redux-saga/effects';
import {
  requestData,
  receiveDataSuccess,
  receiveSingleDataSuccess,
  receiveDataFailed,
} from '../actions/CommentTranslation';
import {
  FETCH_COMMENT_TRANSLATION_LIST,
  POST_COMMENT_TRANSLATION_DATA
} from '../actions/CommentTranslation';
import { fetchCommentTranslation, fetchCommentTranslationList, postCommentTranslationData } from './apis/CommentTranslations';
import { notifySuccess, notifyError } from './Util';

export function* handleFetchCommentTranslationList(action) {
  try {
    yield put(requestData());
    const payload = yield call(fetchCommentTranslationList, action.payload);
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
    const payload = yield call(fetchCommentTranslation, id);
    yield put(receiveSingleDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
};

export function* postCommentTranslation(action) {
  try {
    const { comment_id } = action.payload;
    yield put(requestData());
    yield call(postCommentTranslationData, action.payload);
    const payload = yield call(fetchCommentTranslationList, comment_id);
    yield put(receiveDataSuccess(payload));
    const message = '翻訳を投稿しました。';
    yield put(notifySuccess(message));
  } catch (e) {
    yield put(receiveDataFailed());
    const message = '翻訳の投稿に失敗しました。';
    yield put(notifyError(message));
  }
}

const commentTranslationSagas = [
  takeEvery(POST_COMMENT_TRANSLATION_DATA, postCommentTranslation),
  takeEvery(FETCH_COMMENT_TRANSLATION_LIST, handleFetchCommentTranslationList),
];

export default commentTranslationSagas;
