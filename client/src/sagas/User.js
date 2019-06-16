import { takeEvery, call, put } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import {
  updateUserData, requestData, receiveDataSuccess, receiveDataFailed,
  loginSuccess, loginFailed, removeUserData, updatedUserData,
  updatedProfileData, preparedAuth, updatedProfileQuestionData,
  updatedProfileAnswerData, updatedProfileCommentData
} from '../actions/User';
import {
  CREATE_USER_ACCOUNT,
  SAVE_USER_DATA,
  SAVE_USER_PASSWORD,
  SEND_RESET_PASSWORD_MAIL,
  GET_USER_PROFILE,
  GET_USER_BY_TOKEN,
  LOGIN_USER,
  LOGIN_USER_JWT,
  LOGOUT_USER
} from '../actions/User';
import * as api from './apis/Users';
import { fetchQuestionList } from './apis/Questions';
import { fetchAnswerListWithQuestion } from './apis/Answers';
import { fetchCommentListWithAnswer } from './apis/Comments';
import { notifySuccess, notifyError } from './Util';

export function* createUserAccount(action) {
  const { history } = action.payload;
  try {
    yield put(requestData());
    const payload = yield call(api.createUserAccount, action.payload);
    yield put(receiveDataSuccess(payload));
    const message = '新規登録に成功しました';
    yield put(notifySuccess(message));
    yield call(history.push, '/users/login');
  } catch (e) {
    yield put(receiveDataFailed());
    const message = '新規登録に失敗しました';
    yield put(notifyError(message));
  }
}

export function* loginUserAccount(action) {
  const { history } = action.payload;
  try {
    const payload = yield call(api.loginUser, action.payload);
    yield put(loginSuccess(payload));
    const { jwt } = payload.data;
    localStorage.setItem('jwt', jwt);
    const message = 'ログインに成功しました';
    yield put(notifySuccess(message));
    yield call(history.push, '/');
    // yield put(push('/'));
  } catch (e) {
    //yield put(loginFailed());
    const message = 'アカウントが存在しないか、パスワードが間違っています';
    yield put(notifyError(message));
    yield call(history.push, '/users/login');
  }
}

export function* loginUserAccountJwt(action) {
  try {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('JWTがありません。');
    }
    const payload = yield call(api.loginUserJwt, { jwt });
    yield put(loginSuccess(payload));
    yield put(preparedAuth());
  } catch (e) {
    yield put(loginFailed());
    yield put(preparedAuth());
  }
}

export function* logoutUserAccount(action) {
  try {
    const { history } = action.payload;
    localStorage.removeItem('jwt');
    yield put(removeUserData());
    const message = 'ログアウトしました';
    yield put(notifySuccess(message));
    yield call(history.push, '/');
  } catch (e) {
    //yield put(loginFailed());
    //yield call(history.push, '/users/login');
  }
}

export function* saveUserData(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.saveUserProfile, action.payload);
    const message = 'プロフィールを更新しました';
    yield put(notifySuccess(message));
    yield put(updatedUserData(payload));
  } catch (e) {
    const message = 'プロフィールの更新に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* saveUserPassword(action) {
  try {
    const { history } = action.payload;
    yield put(requestData());
    const payload = yield call(api.saveUserPassword, action.payload);
    yield put(loginSuccess(payload));
    const { jwt } = payload.data;
    localStorage.setItem('jwt', jwt);
    const message = 'パスワードを更新しました';
    yield put(notifySuccess(message));
    yield call(history.push, '/');
  } catch (e) {
    const message = 'パスワードの更新に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function *resetPassword(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.resetPassword, action.payload);
    const message = 'メールを送信しました';
    yield put(notifySuccess(message));
  } catch (e) {
    const message = 'メール送信に失敗しました';
    yield put(notifyError(message));
    yield put(receiveDataFailed());
  }
}

export function* getUserProfile(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.getUser, action.payload);
    const questionParams = {user_id : action.payload};
    const questionPayload = yield call(fetchQuestionList, questionParams);

    const answerParams = {user_id : action.payload};
    const answerPayload = yield call(fetchAnswerListWithQuestion, answerParams);

    const commentParams = {user_id : action.payload};
    const commentPayload = yield call(fetchCommentListWithAnswer, commentParams);
    yield put(updatedProfileData(payload));
    yield put(updatedProfileQuestionData(questionPayload));
    yield put(updatedProfileAnswerData(answerPayload));
    yield put(updatedProfileCommentData(commentPayload));
  } catch (e) {
    yield put(receiveDataFailed());
  }
}

export function* getUserByToken(action) {
  try {
    yield put(requestData());
    const payload = yield call(api.getUserByToken, action.payload);
    yield put(updatedUserData(payload));
  } catch (e) {
    console.log('receiveDataFailed');
    yield put(receiveDataFailed());
  }
}

const userSagas = [
  takeEvery(CREATE_USER_ACCOUNT, createUserAccount),
  takeEvery(LOGIN_USER, loginUserAccount),
  takeEvery(LOGIN_USER_JWT, loginUserAccountJwt),
  takeEvery(LOGOUT_USER, logoutUserAccount),
  takeEvery(SAVE_USER_DATA, saveUserData),
  takeEvery(SAVE_USER_PASSWORD, saveUserPassword),
  takeEvery(GET_USER_PROFILE, getUserProfile),
  takeEvery(GET_USER_BY_TOKEN, getUserByToken),
  takeEvery(SEND_RESET_PASSWORD_MAIL, resetPassword),
];

export default userSagas;
