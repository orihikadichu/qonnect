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

import { postVotes, postQuestionVote, deleteVotes } from './apis/Votes';

import { notifySuccess, notifyError } from './Util';

export function* postVote(action) {
  try {
    const { params, question_id } = action.payload;
    yield put(requestData());
    yield call(postVotes, params);
    //question_idがある場合は質問、ない場合は回答とコメント
    if( question_id ){
      const data = { payload: {
        question_id: question_id,
        translate_language_id: 1
      } };
      yield call(answerSaga.handleFetchAnswerData, data);
    }else{
      const data = { payload: {
        country_id: params.country_id,
      } };
      yield call(questionSagas.handleFetchData, data);
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
    // const { answer_id, user_id} = action.payload;
    const { params, question_id } = action.payload;
    yield put(requestData());
    yield call(deleteVotes, params);
    //question_idがある場合は質問、ない場合は回答とコメント
    if( question_id ){
      const data = { payload: {
        question_id: question_id,
        translate_language_id: 1
      } };
      yield call(answerSaga.handleFetchAnswerData, data);
    }else{
      const data = { payload: {
        country_id: params.country_id,
      } };
      yield call(questionSagas.handleFetchData, data);
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