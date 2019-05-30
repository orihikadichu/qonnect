import { takeEvery, call, put } from 'redux-saga/effects';
import {
    POST_VOTE,
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
} from '../actions/Vote.js';

import { postVotes,fetchVote } from './apis/Votes';

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

const voteSagas = [
  takeEvery(POST_VOTE, postVote),
];

export default voteSagas;