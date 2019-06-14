import { takeEvery, call, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import {
  requestData, receiveDataSuccess, receiveDataFailed, initializeForm,
  receiveSingleDataSuccess,
} from '../actions/Answer';
import {
  FETCH_ANSWER,
  FETCH_ANSWER_LIST,
  POST_ANSWER_DATA,
  SAVE_ANSWER_DATA,
  DELETE_ANSWER,
} from '../actions/Answer';
import * as api from './apis/Answers';
import * as act from '../actions/Comment';
import { notifySuccess, notifyError } from './Util';
import { fetchCommentWithUserList }from './apis/Comments';

export function* handleFetchAnswerData(action) {
  try {
    yield put(requestData());
    const answerList = yield call(api.fetchAnswerList, action.payload);
    const answerId = answerList.data.map(v =>{ return v.id });
    const commentList = yield call(fetchCommentWithUserList, answerId);
    yield put(receiveDataSuccess(answerList));
    yield put(act.receiveCommentDataSuccess(commentList));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* postAnswer(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.postAnswerData, action.payload);
    const { question_id, translate_language_id } = action.payload;
    const answerPayload = yield call(api.fetchAnswerList, { question_id, translate_language_id });
    yield put(receiveDataSuccess(answerPayload));
    yield put(reset('answerForm'));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* fetchSingleAnswerData(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.fetchAnswer, action.payload);
    yield put(receiveSingleDataSuccess(payload));
    yield put(reset('answerForm'));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* saveAnswerData(action) {
  try {
    const { question_id, history } = action.payload;
    yield put(requestData());
    const payload = yield call(api.saveAnswerData, action.payload);
    const message = '回答を更新しました';
    yield put(notifySuccess(message));
    yield call(history.push, `/questions/${question_id}`);
  } catch (e) {
    const message = '回答の更新に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* deleteAnswerData(action) {
  try {
    const { answer_id, question_id, history } = action.payload;
    yield put(requestData());
    yield call(api.deleteAnswerData, action.payload);
    const message = '回答を削除しました';
    yield put(notifySuccess(message));
    yield call(history.push, `/questions/${question_id}`);
  } catch (e) {
    const message = '回答の削除に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}


const answerSagas = [
  takeEvery(FETCH_ANSWER_LIST, handleFetchAnswerData),
  takeEvery(POST_ANSWER_DATA, postAnswer),
  takeEvery(FETCH_ANSWER, fetchSingleAnswerData),
  takeEvery(SAVE_ANSWER_DATA, saveAnswerData),
  takeEvery(DELETE_ANSWER, deleteAnswerData),
];

export default answerSagas;
