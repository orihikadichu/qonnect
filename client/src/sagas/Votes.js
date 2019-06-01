import { takeEvery, call, put } from 'redux-saga/effects';
import {
    POST_VOTE,
    DELETE_VOTE,
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
} from '../actions/Vote.js';

import * as answerSaga from './Answer';

import { postVotes, deleteVotes } from './apis/Votes';

import { notifySuccess, notifyError } from './Util';

export function* postVote(action) {
  try {
    const { postData, question_id } = action.payload;
    yield put(requestData());
    yield call(postVotes, postData);
    const data = { payload: {
      question_id: question_id,
      translate_language_id: 1
    } };
    const message = 'いいねしました';
    yield put(notifySuccess(message));
    yield call(answerSaga.handleFetchAnswerData, data);
  } catch (e) {
    const message = 'いいねに失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* deleteVote(action) {
  try {
    // const { answer_id, user_id} = action.payload;
    const { params, question_id } = action.payload;
    yield put(requestData());
    yield call(deleteVotes, params);
    const data = { payload: {
      question_id: question_id,
      translate_language_id: 1
    } };
    const message = 'いいねを削除しました';
    yield put(notifySuccess(message));
    yield call(answerSaga.handleFetchAnswerData, data);
  } catch (e) {
    const message = 'いいねの削除に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

const voteSagas = [
  takeEvery(POST_VOTE, postVote),
  takeEvery(DELETE_VOTE, deleteVote),
];

export default voteSagas;