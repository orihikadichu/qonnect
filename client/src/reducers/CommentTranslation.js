import {
  REQUEST_DATA,
  RECEIVE_DATA_SUCCESS,
  RECEIVE_SINGLE_DATA_SUCCESS,
  RECEIVE_DATA_FAILED
} from '../actions/CommentTranslation';
import { initialState } from '../constants';

export const list = (state = initialState.commentTranslations, action) => {
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
  case RECEIVE_DATA_FAILED:
    return {
      ...state,
      isFetching: false
    };
  default:
    return state;
  }
};
