import { takeEvery, call, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import {
  requestData,
  receiveDataSuccess,
  receiveSingleDataSuccess,
  receiveDataFailed,
  updatedSingleQuestionTranslation
} from '../actions/QuestionTranslation';
import {
  FETCH_QUESTION_TRANSLATION_LIST,
  FETCH_QUESTION_TRANSLATION,
  POST_QUESTION_TRANSLATION_DATA,
  SAVE_QUESTION_TRANSLATION_DATA
} from '../actions/QuestionTranslation';
import * as api from './apis/QuestionTranslations';
import { notifySuccess, notifyError } from './Util';


export function* handleFetchQuestionTranslationList(action) {
  try {
    // axios.get()を呼ぶ前にisFetchingをtrueにしておく
    yield put(requestData());
    const payload = yield call(api.fetchQuestionTranslationList, action.payload);
    yield put(receiveDataSuccess(payload));
  } catch (e) {
    // isFetchingをfalse
    yield put(receiveDataFailed());
  }
}

export function* handleFetchQuestionTranslationById(action) {
  try {
    const id = action.payload;
    yield put(requestData());
    const payload = yield call(api.fetchQuestionTranslation, id);
    yield put(receiveSingleDataSuccess(payload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* postQuestionTranslation(action) {
  try {
    const { question_id } = action.payload;
    yield put(requestData());
    yield call(api.postQuestionTranslationData, action.payload);
    const payload = yield call(api.fetchQuestionTranslationList, question_id);
    yield put(receiveDataSuccess(payload));
    yield put(reset('questionTranslationForm'));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* saveQuestionTranslationData(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.saveQuestionTranslationData, action.payload);
    const message = '翻訳を更新しました';
    yield put(notifySuccess(message));
    yield put(updatedSingleQuestionTranslation(payload));
  } catch (e) {
    const message = '翻訳の更新に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

const questionTranslationSagas = [
  takeEvery(POST_QUESTION_TRANSLATION_DATA, postQuestionTranslation),
  takeEvery(FETCH_QUESTION_TRANSLATION_LIST, handleFetchQuestionTranslationList),
  takeEvery(FETCH_QUESTION_TRANSLATION, handleFetchQuestionTranslationById),
  takeEvery(SAVE_QUESTION_TRANSLATION_DATA, saveQuestionTranslationData),
];

export default questionTranslationSagas;
