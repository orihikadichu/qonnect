import { createAction } from 'redux-actions';

// 文字列定数
export const CREATE_USER_ACCOUNT = Symbol('CREATE_USER_ACCOUNT');
export const CLICK_SUBMIT = Symbol('CLICK_SUBMIT');
export const SAVE_USER_MNEMONIC = Symbol('SAVE_USER_MNEMONIC');
export const LOGIN_USER = Symbol('LOGIN_USER');
export const LOGIN_USER_JWT = Symbol('LOGIN_USER_JWT');
export const LOGOUT_USER = Symbol('LOGOUT_USER');
export const UPDATE_USER_DATA = Symbol('UPDATE_USER_DATA');
export const SAVE_USER_PROFILE = Symbol('SAVE_USER_PROFILE');
export const UPDATED_USER_DATA = Symbol('UPDATED_USER_DATA');
export const REMOVE_USER_DATA = Symbol('REMOVE_USER_DATA');
export const REQUEST_DATA = Symbol('REQUEST_DATA');
export const RECEIVE_DATA_SUCCESS = Symbol('RECEIVE_DATA_SUCCESS');
export const RECEIVE_DATA_FAILED = Symbol('RECEIVE_DATA_FAILED');
export const LOGIN_SUCCESS = Symbol('LOGIN_SUCCESS');
export const LOGIN_FAILED = Symbol('LOGIN_FAILED');
export const GET_USER_PROFILE = Symbol('GET_USER_PROFILE');
export const UPDATED_PROFILE_DATA = Symbol('UPDATED_PROFILE_DATA');
export const PREPARED_AUTH = Symbol('PREPARED_AUTH');


export const createUserAccount = createAction(CREATE_USER_ACCOUNT);
export const clickSubmit = createAction(CLICK_SUBMIT);
export const saveUserMnemonic = createAction(SAVE_USER_MNEMONIC);
export const loginUser = createAction(LOGIN_USER);
export const loginUserJwt = createAction(LOGIN_USER_JWT);
export const logoutUser = createAction(LOGOUT_USER);
export const saveUserProfile = createAction(SAVE_USER_PROFILE);
export const updateUserData = createAction(UPDATE_USER_DATA);
export const updatedUserData = createAction(UPDATED_USER_DATA);
export const removeUserData = createAction(REMOVE_USER_DATA);
export const requestData = createAction(REQUEST_DATA);
export const receiveDataSuccess = createAction(RECEIVE_DATA_SUCCESS);
export const receiveDataFailed = createAction(RECEIVE_DATA_FAILED);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailed = createAction(LOGIN_FAILED);
export const getUserProfile = createAction(GET_USER_PROFILE);
export const updatedProfileData = createAction(UPDATED_PROFILE_DATA);
export const preparedAuth = createAction(PREPARED_AUTH);