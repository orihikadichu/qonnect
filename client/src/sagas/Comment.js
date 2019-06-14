import { takeEvery, call, put } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import * as act from '../actions/Comment';
import * as api from './apis/Comments';
import {
  FETCH_SINGLE_COMMENT,
  POST_COMMENT,
  SAVE_COMMENT_DATA,
  DELETE_COMMENT,
} from '../actions/Comment';
import * as answerSaga from './Answer'; 
import { notifySuccess, notifyError } from './Util';

import { fetchCommentWithUserList }from './apis/Comments';
import * as act2 from '../actions/Comment';

export function* fetchSingleComment(action) {
  try {
    yield put(act.requestData());
    const comment_id = action.payload;
    const comment = yield call(api.fetchComment, comment_id);
    yield put(act.updatedSingleCommentData(comment));
  } catch (e) {
    const message = 'コメントの投稿に失敗しました。';
    yield put(notifyError(message));
    //yield put(updatedCommentData());
  }
}

export function* postComment(action) {
  try {
    yield put(act.requestData());
    console.log("action.payloadファイルの中",action.payload);
    const { answer_id, question_id, current_translate_language_id, answerIdList } = action.payload;
    yield call(api.postCommentData, action.payload);
    const commentPayload = yield call(api.fetchCommentsList, { answer_id });    
    const answerId = answerIdList;
    console.log("postcommentsagaファイルの中",answerId);
    const commentList = yield call(fetchCommentWithUserList, answerId);
    yield put(act2.receiveCommentDataSuccess(commentList));

    const message = 'コメントを投稿しました。';
    yield put(notifySuccess(message));
    const data = { payload: {
      question_id,
      translate_language_id: current_translate_language_id
    } };
    yield call(answerSaga.handleFetchAnswerData, data);
  } catch (e) {
    const message = 'コメントの投稿に失敗しました。';
    yield put(notifyError(message));
    //yield put(updatedCommentData());
  }
}

export function* saveComment(action) {
  try {
    yield put(act.requestData());
    const {
      comment_id,
      question_id,
      history
    } = action.payload;
    const comment = yield call(api.saveCommentData, action.payload);
    yield put(act.updatedSingleCommentData(comment));
    const message = 'コメントを編集しました。';
    yield put(notifySuccess(message));
    yield call(history.push, `/questions/${question_id}`);
  } catch (e) {
    const message = 'コメントの編集に失敗しました。';
    yield put(notifyError(message));
    //yield put(updatedCommentData());
  }
}

export function* deleteCommentData(action) {
  try {
    const { comment_id, question_id, user_id, history } = action.payload;
    yield put(act.requestData());
    yield call(api.deleteCommentData, action.payload);
    const message = 'コメントを削除しました';
    yield put(notifySuccess(message));
    yield call(history.push, `/questions/${question_id}`);
  } catch (e) {
    const message = 'コメントの削除に失敗しました';
    yield put(notifyError(message));
    yield put(act.receiveDataFailed());
  }
}

const commentSagas = [
  takeEvery(FETCH_SINGLE_COMMENT, fetchSingleComment),
  takeEvery(POST_COMMENT, postComment),
  takeEvery(SAVE_COMMENT_DATA, saveComment),
  takeEvery(DELETE_COMMENT, deleteCommentData),
];

export default commentSagas;
