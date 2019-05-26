import { takeEvery, call, put } from 'redux-saga/effects';

import {
    requestData,
    receiveDataSuccess,
    receiveDataFailed,
    FETCH_NOT_TRANSLATED,
} from '../actions/NotTranslated';

import {
    fetchNotTranslated,
} from './apis/Questions';

export function* handleFetchData(action) {
  try {

    yield put(requestData());

    const payload = yield call(fetchNotTranslated, action.payload);

    //reducers/NotTranslated.jsで関数を実行する。
    yield put(receiveDataSuccess(payload));

    console.log("-----------payload-------------",payload);
　  　
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