import { takeEvery, call, put } from 'redux-saga/effects';
import {
    POST_VOTE,
    DELETE_VOTE,
    HANDLE_VOTE,
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
    yield put(receiveDataFailed());
  }
};

export function* handleVote(action) {
  const  voteParams  = action.payload;
  const postActionType = voteParams.postActionType;

  try {
    yield put(requestData());
    const thisPageKey = voteParams.thisPageKey;

    if (postActionType==="post") {
      yield call(postVotes, voteParams);
    } else {
      yield call(deleteVotes, voteParams);
    }
    
    switch (thisPageKey) {
      case "comment":
      case "answer":
          const commentAnswerData = { payload: {
            question_id: voteParams.thisPageContentId,
            translate_language_id: 1,
          } };
          yield call(answerSaga.handleFetchAnswerData, commentAnswerData);
          break;
      case "questionList":
          const questionData = { payload: {
            country_id: voteParams.country_id,
          } };
          yield call(questionSagas.handleFetchData, questionData);
          break;
      case "questionView":
          const singleQuestionData = { payload: voteParams.thisPageContentId };
          yield call(questionSagas.handleFetchQuestionById, singleQuestionData);
          break;
    }
    const message = postActionType === "post" 
                  ? "いいねしました"
                  : "いいねを削除しました";
    yield put(notifySuccess(message));
  } catch (e) {
    const message = postActionType === "post" 
                  ? "いいねできませんでした。"
                  : "いいねの削除ができませんでした。";
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

const voteSagas = [
  takeEvery(HANDLE_VOTE, handleVote),
];

export default voteSagas;
