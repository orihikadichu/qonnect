import { takeEvery, call, put } from 'redux-saga/effects';
import {
    POST_VOTE,
    DELETE_VOTE,
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
} from '../actions/Vote.js';

import { postVotes, fetchVote, deleteVotes } from './apis/Votes';

import { notifySuccess, notifyError } from './Util';

export function* postVote(action) {
  try {
    yield put(requestData());
    yield call(postVotes, action.payload);
    const payload = yield call(fetchVote);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* deleteVote(action) {
  try {
    // const { answer_id, user_id} = action.payload;
    yield put(requestData());
    yield call(deleteVotes, action.payload);
    const message = 'いいねを削除しました';
    yield put(notifySuccess(message));
    // yield call(history.push, `/questions/${question_id}`);
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