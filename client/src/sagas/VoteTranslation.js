import { takeEvery, call, put } from 'redux-saga/effects';
import {
    POST_VOTE,
    DELETE_VOTE,
    HANDLE_VOTE,
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
} from '../actions/VoteTranslation';

import * as answerTranslationSagas from './AnswerTranslation';
import * as questionTranslationSagas from './QuestionTranslation';
import * as commentTranslationSagas from './CommentTranslation';

import { 
  notifySuccess, 
  notifyError 
} from './Util';

import { postVotes, deleteVotes } from './apis/VoteTranslations';

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

    const data = { payload: voteParams.thisPageContentId } ;
    switch (thisPageKey) {
      case "comment":
          yield call(commentTranslationSagas.handleFetchCommentTranslationList, data);
          break;
      case "answer":
          yield call(answerTranslationSagas.handleFetchAnswerTranslationList, data);
          break;
      case "question":
          yield call(questionTranslationSagas.handleFetchQuestionTranslationList, data);
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

const voteTranslationSagas = [
  takeEvery(HANDLE_VOTE, handleVote),
];

export default voteTranslationSagas;