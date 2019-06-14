import {
  CLICK_SUBMIT,
  REQUEST_DATA,
  RECEIVE_DATA_FAILED,
  REMOVE_USER_DATA,
  UPDATED_USER_DATA,
  UPDATED_PROFILE_DATA,
  UPDATED_PROFILE_QUESTION_DATA,
  UPDATED_PROFILE_ANSWER_DATA,
  UPDATED_PROFILE_COMMENT_DATA,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  PREPARED_AUTH
} from '../actions/User';
import { initialState } from '../constants';

export const signUp = (state = initialState.signUp, action) => {
  switch (action.type) {
  case CLICK_SUBMIT:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload.data,
      jwt: action.payload.data.jwt
    };
  case LOGIN_FAILED:
    return {
      ...state,
      isLoggedIn: false,
      user: {},
      jwt: ''
    };
  case REMOVE_USER_DATA:
    return {
      ...state,
      isLoggedIn: false,
      user: {},
      jwt: ''
    };
  case REQUEST_DATA:
    return {
      ...state,
      isFetching: true
    };
  case RECEIVE_DATA_FAILED:
    return {
      ...state,
      isFetching: false
    };
  case UPDATED_USER_DATA:
    return {
      ...state,
      isFetching: false,
      user: action.payload.data
    };
  case PREPARED_AUTH:
    return {
      ...state,
      isPrepared: true
    };
  default:
    return state;
  }
};

export const profile = (state = initialState.profile, action) => {
  switch (action.type) {
  case REQUEST_DATA:
    return {
      ...state,
      isFetching: true
    };
  case UPDATED_PROFILE_DATA:
    return {
      ...state,
      isFetching: false,
      user: action.payload.data
    };
  case UPDATED_PROFILE_QUESTION_DATA:
    return {
      ...state,
      isFetching: false,
      questions: action.payload.data
    };
  case UPDATED_PROFILE_ANSWER_DATA:
    return {
      ...state,
      isFetching: false,
      answers: action.payload.data
    };
  case UPDATED_PROFILE_COMMENT_DATA:
    return {
      ...state,
      isFetching: false,
      comments: action.payload.data
    };
  default:
    return state;
  }
};
