import {
  POST_QUESTION_DATA,
  REQUEST_DATA,
  RECEIVE_DATA_SUCCESS,
  RECEIVE_SINGLE_DATA_SUCCESS,
  RECEIVE_DATA_FAILED,
  UPDATE_CURRENT_TRANSLATE_LANGUAGE,
  UPDATED_QUESTION_DATA
} from '../actions/Question';
import { initialState } from '../constants';

export const form = (state = initialState.questionForm, action) => {
  switch (action.type) {
  case POST_QUESTION_DATA:
    return {
      ...state
    };
  default:
    return state;
  }
};

export const list = (state = initialState.questions, action) => {
  switch (action.type) {
  case REQUEST_DATA:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_DATA_SUCCESS:
    return {
      ...state,
      isFetching: false,
      questionArray: action.payload.data
    };
  case RECEIVE_SINGLE_DATA_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currentQuestion: action.payload.data
    };
  case RECEIVE_DATA_FAILED:
    return {
      ...state,
      isFetching: false
    };
  case UPDATE_CURRENT_TRANSLATE_LANGUAGE:
    return {
      ...state,
      translateLanguageId: parseInt(action.payload)
    };
  case UPDATED_QUESTION_DATA:
    return {
      ...state,
      isFetching: false,
      currentQuestion: action.payload.data
    };
  default:
    return state;
  }
};
