import { put, takeEvery } from 'redux-saga/effects';
import {
    ACTION_ALERT_MESSAGE,
} from '../actions/Notification';
import { notifyAlert } from './Util';

export function* alertMessage(action) {
    yield put(notifyAlert(action.payload));
}

  const notificationSagas = [
    takeEvery(ACTION_ALERT_MESSAGE, alertMessage),
  ];
  
export default notificationSagas;