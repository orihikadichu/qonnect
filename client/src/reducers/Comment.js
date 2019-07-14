import {
  REQUEST_DATA,
  RECEIVE_COMMENT_DATA_SUCCESS,
  POST_COMMENT,
  UPDATED_COMMENT_DATA,
  UPDATED_SINGLE_COMMENT_DATA,
  UPDATED_COMMENT_ARRAY
} from '../actions/Comment';
import { initialState } from '../constants';

export const list = (state = initialState.comments, action) => {
  console.log('comment_action', action);
  switch (action.type) {
  case REQUEST_DATA:
    return {
      ...state,
      isFetching: true
    };
  case RECEIVE_COMMENT_DATA_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currentCommentList: action.payload.data
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
