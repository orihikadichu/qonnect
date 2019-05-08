import { takeEvery, call, put } from 'redux-saga/effects';
import {
  requestData,
  receiveDataSuccess,
  receiveSingleDataSuccess,
  receiveDataFailed,
  updateCurrentTranslateLanguage,
  updatedQuestionData
} from '../actions/Question';
import {
  FETCH_QUESTION_LIST,
  FETCH_QUESTION,
  CHANGE_QUESTION_LIST_LANGUAGE,
  POST_QUESTION_DATA,
  SAVE_QUESTION_DATA,
  DELETE_QUESTION,
} from '../actions/Question';
import * as api from './apis/Questions';
import { notifySuccess, notifyError } from './Util';

export function* handleFetchData(action) {
  try {
    // axios.get()を呼ぶ前にisFetchingをtrueにしておく
    yield put(requestData());
    const payload = yield call(api.fetchQuestionList, action.payload);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    // isFetchingをfalse
    yield put(receiveDataFailed());
  }
};

export function* handleFetchQuestionById(action) {
  try {
    const id  = action.payload;
    yield put(requestData());
    const payload = yield call(api.fetchQuestion, id);
    yield put(receiveSingleDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
};

export function* postQuestion(action) {
  try {
    yield put(requestData());
    yield call(api.postQuestionData, action.payload);
    const payload = yield call(api.fetchQuestionList);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* changeQuestionListLanguage(action) {
  try {
    const { translate_language_id } = action.payload;
    yield put(requestData());
    // const payload = yield call(fetchQuestionList, action.payload);
    // yield put(updateCurrentTranslateLanguage(action));
    // yield put(receiveDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* saveQuestionData(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.saveQuestionData, action.payload);
    const message = '質問を更新しました';
    yield put(notifySuccess(message));
    yield put(updatedQuestionData(payload));
  } catch (e) {
    const message = '質問の更新に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* deleteQuestionData(action) {
  try {
    const { question_id, history } = action.payload;
    yield put(requestData());
    yield call(api.deleteQuestionData, action.payload);
    const message = '質問を削除しました';
    yield put(notifySuccess(message));
    const payload = yield call(api.fetchQuestionList);
    yield put(receiveDataSuccess(payload));
    yield call(history.push, '/');
  } catch (e) {
    const message = '質問の削除に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

const questionSagas = [
  takeEvery(FETCH_QUESTION_LIST, handleFetchData),
  takeEvery(FETCH_QUESTION, handleFetchQuestionById),
  // takeEvery(CHANGE_QUESTION_LIST_LANGUAGE, changeQuestionListLanguage),
  takeEvery(POST_QUESTION_DATA, postQuestion),
  takeEvery(SAVE_QUESTION_DATA, saveQuestionData),
  takeEvery(DELETE_QUESTION, deleteQuestionData),
];

export default questionSagas;
