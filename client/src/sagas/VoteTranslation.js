import { takeEvery, call, put } from 'redux-saga/effects';
import {
    POST_VOTE,
    DELETE_VOTE,
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
} from '../actions/VoteTranslation';

import * as answerTranslationSagas from './AnswerTranslation';
import * as questionTranslationSagas from './QuestionTranslation';

import { 
  notifySuccess, 
  notifyError 
} from './Util';

import { postVotes, deleteVotes } from './apis/VoteTranslations';

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
          // yield call(answerTranslationSagas.handleFetchAnswerData, data);
          break;
      case "question":
          data = { payload: params.questionId } 
          yield call(questionTranslationSagas.handleFetchQuestionTranslationList, data);
          break;
      case "questionView":
          data = { payload: params.question_id };
          // yield call(questionTranslationSagas.handleFetchQuestionById, data);
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
          // yield call(answerTranslationSagas.handleFetchAnswerData, data);
          break;
      case "question":
          data = { payload:  params.questionId };
          yield call(questionTranslationSagas.handleFetchQuestionTranslationList, data);
          break;
      case "questionView":
          data = { payload: params.question_id };
          // yield call(questionTranslationSagas.handleFetchQuestionById, data);
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

const voteTranslationSagas = [
  takeEvery(POST_VOTE, postVote),
  takeEvery(DELETE_VOTE, deleteVote),
];

export default voteTranslationSagas;