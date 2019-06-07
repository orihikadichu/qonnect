import { call, put, take } from "redux-saga/effects";
// import { testSaga } from 'redux-saga-test-plan';
import * as sagas from '../../src/sagas/Question';
import * as api from '../../src/sagas/apis/Questions';

it("fetches users", () => {
  const users = ["Jeremy", "Tucker"];

  // return testSaga(sagas.handleFetchData)
  //   .provide([[call(api.fetchQuestionList), users]])
  //   .put({ type: "FETCH_USERS_SUCCESS", payload: users })
  //   .run();
});
