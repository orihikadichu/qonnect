import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import * as questions from './reducers/Question';
import * as answers from './reducers/Answer';
import * as users from './reducers/User';
import * as comments from './reducers/Comment';
import * as questionTranslations from './reducers/QuestionTranslation';
import * as answerTranslations from './reducers/AnswerTranslation';
import * as commentTranslations from './reducers/CommentTranslation';

const reducer = combineReducers({
  answerForm: answers.form,
  answers: answers.list,
  questionForm: questions.form,
  questions: questions.list,
  questionTranslationForm: questionTranslations.form,
  questionTranslations: questionTranslations.list,
  answerTranslationForm: answerTranslations.form,
  answerTranslations: answerTranslations.list,
  auth: users.auth,
  signUp: users.signUp,
  profile: users.profile,
  comments: comments.list,
  commentTranslations: commentTranslations.list,
  form: reduxFormReducer,
  notifications: notificationsReducer()
});

export default reducer;
