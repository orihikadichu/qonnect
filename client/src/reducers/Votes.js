import {
    POST_VOTE,
    REQUEST_DATA,
    RECEIVE_DATA_SUCCESS,
    RECEIVE_DATA_FAILED,
  } from '../actions/VoteTranslation.js';

  import { initialState } from '../constants';
    
  export const list = (state = initialState.votes, action) => {
    switch (action.type) {
    case POST_VOTE:
      return {
        ...state
      }; 
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
    case RECEIVE_DATA_FAILED:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
    }
  };
  