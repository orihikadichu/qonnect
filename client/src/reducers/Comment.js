import {
  REQUEST_DATA,
  POST_COMMENT,
  UPDATED_COMMENT_DATA,
  UPDATED_SINGLE_COMMENT_DATA
} from '../actions/Comment';
import { initialState } from '../constants';

export const list = (state = initialState.comments, action) => {
  switch (action.type) {
  case REQUEST_DATA:
    return {
      ...state,
      isFetching: true
    };
  case UPDATED_COMMENT_DATA:
    return {
      ...state,
      isFetching: false,
      currentCommentList: action.payload.data
    };
  case UPDATED_SINGLE_COMMENT_DATA:
    return {
      ...state,
      isFetching: false,
      currentComment: action.payload.data
    };
  default:
    return state;
  }
};
