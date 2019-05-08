import { takeEvery, call, put } from 'redux-saga/effects';
// import { push } from 'react-router-redux';
import {
    updateUserData, requestData, receiveDataSuccess, receiveDataFailed,
    loginSuccess, loginFailed, removeUserData, updatedUserData,
    updatedProfileData, preparedAuth
} from '../actions/User';
import {
    CREATE_USER_ACCOUNT,
    SAVE_USER_PROFILE,
    GET_USER_PROFILE,
    LOGIN_USER,
    LOGIN_USER_JWT,
    LOGOUT_USER
} from '../actions/User';
import * as api from './apis/Users';
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
        console.log('loginUserAccount');
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

export function* saveUserProfile(action) {
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

export function* getUserProfile(action) {
    try {
        yield put(requestData());
        const payload = yield call(api.getUser, action.payload);
        yield put(updatedProfileData(payload));
    } catch (e) {
        yield put(receiveDataFailed());
    }
}

const userSagas = [
    takeEvery(CREATE_USER_ACCOUNT, createUserAccount),
    takeEvery(LOGIN_USER, loginUserAccount),
    takeEvery(LOGIN_USER_JWT, loginUserAccountJwt),
    takeEvery(LOGOUT_USER, logoutUserAccount),
    takeEvery(SAVE_USER_PROFILE, saveUserProfile),
    takeEvery(GET_USER_PROFILE, getUserProfile),
];

export default userSagas;
