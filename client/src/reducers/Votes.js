import {
    POST_VOTE,
    REQUEST_DATA,
    RECEIVE_DATA_SUCCESS,
    RECEIVE_DATA_FAILED,
  } from '../actions/Vote';

  import { initialState } from '../constants';
  
  export const form = (state = initialState.questionForm, action) => {
    switch (action.type) {
    case POST_VOTE:
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
      console.log("action",action);
      return {
        ...state,
        isFetching: false,
        questionArray: action.payload.data                  
      };
    // case RECEIVE_SINGLE_DATA_SUCCESS:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     currentQuestion: action.payload.data
    //   };
    case RECEIVE_DATA_FAILED:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
    }
  };
  