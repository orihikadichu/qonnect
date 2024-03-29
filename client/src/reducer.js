import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';
import * as questions from './reducers/Question';
import * as answers from './reducers/Answer';
import * as users from './reducers/User';
import * as comments from './reducers/Comment';
import * as questionTranslations from './reducers/QuestionTranslation';
import * as answerTranslations from './reducers/AnswerTranslation';
import * as commentTranslations from './reducers/CommentTranslation';
import * as notTranslated from './reducers/NotTranslated';
import * as votes from './reducers/Votes';
import * as voteTranslations from './reducers/VoteTranslation';
import { intl } from './reducers/Intl';
import { ctgr } from './reducers/Category';
import { sortRule } from './reducers/Sort';
import { addLocaleData } from 'react-intl';

const reducer = combineReducers({
  intl: intl,
  ctgr: ctgr,
  sort: sortRule,
  answers: answers.list,
  questions: questions.list,
  questionTranslations: questionTranslations.list,
  answerTranslations: answerTranslations.list,
  auth: users.auth,
  signUp: users.signUp,
  profile: users.profile,
  comments: comments.list,
  commentTranslations: commentTranslations.list,
  not_translate: notTranslated.list,
  votes: votes.list,
  voteTranslations: voteTranslations.list,
  notifications: notificationsReducer()
});

export default reducer;
