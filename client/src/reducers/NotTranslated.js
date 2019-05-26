import {
    REQUEST_DATA,
    RECEIVE_DATA_SUCCESS,
} from '../actions/NotTranslated';
  
import { initialState } from '../constants';

export const list = (state = initialState.not_translate, action) => {
  switch (action.type) {
  case REQUEST_DATA:
    return {
      //...stateは他の状態は維持してisFetchingだけを変更するというコード
      ...state,
      isFetching: true,
    };
  
  case RECEIVE_DATA_SUCCESS:

    console.log("action",action)
    const { questions, answers, comments } = action.payload;

    return {
      ...state,
      //isFetchingは終了したのでfalseにしている。
      isFetching: false,
      //ここでquestionArrayに値を入れている。
      questions,
      answers,
      comments,
    };
  
  default:
    return state;
  }
};