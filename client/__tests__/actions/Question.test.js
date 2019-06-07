import * as actions from '../../src/actions/Question';

describe('actions', () => {
  it('should create an action to post question data', () => {
    const postData = {
      user_id: 1,
      translate_language_id: 1,
      content: 'hoge'
    };
    const expectedAction = {
      type: actions.POST_QUESTION_DATA,
      payload: postData
    };
    expect(actions.postQuestionData(postData)).toEqual(expectedAction);
  });
});

