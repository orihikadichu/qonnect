import {
    POST_VOTE,
    REQUEST_DATA,
    RECEIVE_DATA_SUCCESS,
    RECEIVE_DATA_FAILED,
  } from '../actions/VoteTranslation';

  import { initialState } from '../constants';
  
  export const form = (state = initialState.voteTranslation, action) => {
    switch (action.type) {
    case POST_VOTE:
      return {
        ...state
      };
    default:
      return state;
    }
  };
  
  export const list = (state = initialState.voteTranslation, action) => {
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
        status: action.payload.data                  
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