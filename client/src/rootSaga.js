import { all } from 'redux-saga/effects';
import userSagas from './sagas/User';
import questionSagas from './sagas/Question';
import answerSagas from './sagas/Answer';
import questionTranslationSagas from './sagas/QuestionTranslation';
import answerTranslationSagas from './sagas/AnswerTranslation';
import commentSagas from './sagas/Comment';
import commentTranslationSagas from './sagas/CommentTranslation';
import NotTranslatedSagas from './sagas/NotTranslated';     
import voteSagas from './sagas/Votes';
import voteTranslationSagas from './sagas/VoteTranslation';              

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...questionSagas,
    ...answerSagas,
    ...questionTranslationSagas,
    ...answerTranslationSagas,
    ...commentSagas,
    ...commentTranslationSagas,
    ...NotTranslatedSagas,
    ...voteSagas,
    ...voteTranslationSagas,
  ]);
}
