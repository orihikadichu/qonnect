import { createAction } from 'redux-actions';

export const ACTION_ALERT_MESSAGE = Symbol('ACTION_ALERT_MESSAGE');

export const actionAlertMessage = createAction(ACTION_ALERT_MESSAGE);

