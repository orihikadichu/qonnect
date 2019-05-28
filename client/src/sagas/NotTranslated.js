import { takeEvery, call, put } from 'redux-saga/effects';

import {
  requestData,
  receiveDataSuccess,
  receiveDataFailed,
  FETCH_NOT_TRANSLATED,
} from '../actions/NotTranslated';

import {
  fetchNotTranslatedQuestions,
  fetchNotTranslatedAnswers,
  fetchNotTranslatedComments,
} from './apis/NotTranslated';
import { changeQuestionListLanguage } from './Question';

export function* handleFetchData(action) {
  try {

    yield put(requestData());

    //未翻訳一覧を取り出す
    // const questions = yield call(fetchNotTranslated, action.payload);

    //質問を取り出す
    const questions = yield call(fetchNotTranslatedQuestions, action.payload);

    //回答を取り出す
    const answers = yield call(fetchNotTranslatedAnswers, action.payload);

    //コメントを取り出す
    const comments = yield call(fetchNotTranslatedComments, action.payload);

    const NotTranslatedList={
      questions : questions.data,
      answers : answers.data,
      comments: comments.data,
    };

    //reducers/NotTranslated.jsで関数を実行する。
    yield put(receiveDataSuccess(NotTranslatedList));
  } catch (e) {
    // isFetchingをfalse
    yield put(receiveDataFailed());
  }
};

const NotTranslatedSagas = [
  //FETCH_QUESTION_LISTというアクションが発火させた場合はhandleFetchDataを起動させる。
  takeEvery(FETCH_NOT_TRANSLATED, handleFetchData),
];

export default NotTranslatedSagas;
