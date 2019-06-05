import { takeEvery, call, put } from 'redux-saga/effects';
import {
  requestData,
  receiveDataSuccess,
  receiveSingleDataSuccess,
  receiveDataFailed,
  updatedSingleAnswerTranslation
} from '../actions/AnswerTranslation';
import {
  FETCH_ANSWER_TRANSLATION_LIST,
  FETCH_ANSWER_TRANSLATION,
  POST_ANSWER_TRANSLATION_DATA,
  SAVE_ANSWER_TRANSLATION_DATA,
  DELETE_ANSWER_TRANSLATION,
} from '../actions/AnswerTranslation';
import * as api from './apis/AnswerTranslations';
import { notifySuccess, notifyError } from './Util';
import * as questionSagas from './Question';

export function* handleFetchAnswerTranslationList(action) {
  try {
    // axios.get()を呼ぶ前にisFetchingをtrueにしておく
    yield put(requestData());
    const payload = yield call(api.fetchAnswerTranslationList, action.payload);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    // isFetchingをfalse
    yield put(receiveDataFailed());
  }
};

export function* handleFetchAnswerTranslationById(action) {
  try {
    const id  = action.payload;
    yield put(requestData());
    const payload = yield call(api.fetchAnswerTranslation, id);
    yield put(receiveSingleDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
};

export function* postAnswerTranslation(action) {
  try {
    const { answer_id } = action.payload;
    yield put(requestData());
    yield call(api.postAnswerTranslationData, action.payload);
    const payload = yield call(api.fetchAnswerTranslationList, answer_id);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* saveAnswerTranslationData(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.saveAnswerTranslationData, action.payload);
    const message = '翻訳を更新しました';
    yield put(notifySuccess(message));
    yield put(updatedSingleAnswerTranslation(payload));
  } catch (e) {
    const message = '翻訳の更新に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* deleteAnswerTranslation(action) {
  try {
    const { id, history } = action.payload;
    yield put(requestData());
    yield call(api.deleteAnswerTranslation, action.payload);
    const message = '翻訳を削除しました';
    yield put(notifySuccess(message));
    const payload = yield call(api.fetchAnswerTranslationList);
    yield put(receiveDataSuccess(payload));
    yield call(history.push, '/');
  } catch (e) {
    const message = '翻訳の削除に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

const answerTranslationSagas = [
  takeEvery(POST_ANSWER_TRANSLATION_DATA, postAnswerTranslation),
  takeEvery(FETCH_ANSWER_TRANSLATION_LIST, handleFetchAnswerTranslationList),
  takeEvery(FETCH_ANSWER_TRANSLATION, handleFetchAnswerTranslationById),
  takeEvery(SAVE_ANSWER_TRANSLATION_DATA, saveAnswerTranslationData),
  takeEvery(DELETE_ANSWER_TRANSLATION, deleteAnswerTranslation),
];

export default answerTranslationSagas;
