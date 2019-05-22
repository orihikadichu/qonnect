import {
  POST_QUESTION_TRANSLATION_DATA,
  INITIALIZE_FORM,
  REQUEST_DATA,
  RECEIVE_DATA_SUCCESS,
  RECEIVE_SINGLE_DATA_SUCCESS,
  RECEIVE_DATA_FAILED,
  UPDATED_SINGLE_QUESTION_TRANSLATION
} from '../actions/QuestionTranslation';
import { initialState } from '../constants';

export const list = (state = initialState.questionTranslations, action) => {
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
      currentTranslationList: action.payload.data
    };
  case RECEIVE_SINGLE_DATA_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currentTranslation: action.payload.data
    };
  case RECEIVE_DATA_FAILED:
    return {
      ...state,
      isFetching: false
    };
  case UPDATED_SINGLE_QUESTION_TRANSLATION:
    return {
      ...state,
      currentTranslation: action.payload.data
    };
  default:
    return state;
  }
};
