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
  deleteVotes 
} from './apis/Votes';

import { 
  notifySuccess, 
  notifyError 
} from './Util';

export function* postVote(action) {
  try {
    const { params, key } = action.payload;
    yield put(requestData());
    yield call(postVotes, params);
    
    let data;
    switch (key) {
      case "comment":
      case "answer":
          data = { payload: {
            question_id: params.questionId,
            translate_language_id: 1,
          } };
          yield call(answerSaga.handleFetchAnswerData, data);
          break;
      case "questionList":
          data = { payload: {
            country_id: params.country_id,
          } };
          yield call(questionSagas.handleFetchData, data);
          break;
      case "questionView":
          data = { payload: params.question_id };
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
    const { params, key } = action.payload;
    yield put(requestData());
    yield call(deleteVotes, params);

    let data;
    switch (key) {
      case "comment":
      case "answer":
          data = { payload: {
            question_id: params.questionId,
            translate_language_id: 1,
          } };
          yield call(answerSaga.handleFetchAnswerData, data);
          break;
      case "questionList":
          data = { payload: {
            country_id: params.country_id,
          } };
          yield call(questionSagas.handleFetchData, data);
          break;
      case "questionView":
          data = { payload: params.question_id };
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