import { takeEvery, call, put } from 'redux-saga/effects';
import {
    POST_VOTE,
    DELETE_VOTE,
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
} from '../actions/Vote.js';

import * as answerSaga from './Answer';
import * as questionSagas from './Question';
import {
  postVotes,
  deleteVotes,
  fetchQuestionVotesList,
} from './apis/Votes';

import {
  notifySuccess,
  notifyError
} from './Util';


export function* handleFetchQestionVotesList(action) {
  try {
    yield put(requestData());
    const payload = yield call(fetchQuestionVotesList, action.payload);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    // isFetchingをfalse
    yield put(receiveDataFailed());
  }
};

export function* postVote(action) {
  try {
    const { sendVoteParams, key } = action.payload;
    yield put(requestData());
    yield call(postVotes, sendVoteParams);

    let data;
    switch (key) {
      case "comment":
      case "answer":
          data = { payload: {
            question_id: sendVoteParams.questionId,
            translate_language_id: 1,
          } };
          yield call(answerSaga.handleFetchAnswerData, data);
          break;
      case "questionList":
          data = { payload: {
            country_id: sendVoteParams.country_id,
          } };
          yield call(questionSagas.handleFetchData, data);
          break;
      case "questionView":
          data = { payload: sendVoteParams.question_id };
          yield call(questionSagas.handleFetchQuestionById, data);
          break;
    }

    const message = 'いいねしました';
    yield put(notifySuccess(message));

  } catch (e) {
    const message = 'いいねに失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* deleteVote(action) {
  try {
    const { deleteVoteParams, key } = action.payload;
    yield put(requestData());
    yield call(deleteVotes, deleteVoteParams);

    let data;
    switch (key) {
      case "comment":
      case "answer":
          data = { payload: {
            question_id: deleteVoteParams.questionId,
            translate_language_id: 1,
          } };
          yield call(answerSaga.handleFetchAnswerData, data);
          break;
      case "questionList":
          data = { payload: {
            country_id: deleteVoteParams.country_id,
          } };
          yield call(questionSagas.handleFetchData, data);
          break;
      case "questionView":
          data = { payload: deleteVoteParams.vote_id };
          yield call(questionSagas.handleFetchQuestionById, data);
          break;
    }
    const message = 'いいねを削除しました';
    yield put(notifySuccess(message));
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
