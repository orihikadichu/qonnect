import { locales, categories, sorts } from './intl';

const savedLocale = localStorage.getItem('locale');
const currentLocale = savedLocale ? savedLocale : 'ja';

export const initialState = {
  intl: locales[currentLocale],
  ctgr: {
    category: 'all',
    categoryId: 0
  },
  sort: {
    sort: 'Asc',
    sortId: 3
  },
  signUp: {
    mail: '',
    password: '',
    mnemonic: '',
    hash: '',
  },
  profile: {
    isFetching: false,
    user: {},
    questions: [],
    answers: [],
    comments: [],
  },
  auth: {
    isPrepared: false,
    isFetching: false,
    isLoggedIn: false,
    user: {},
    jwt: ''
  },
  answers: {
    isFetching: false,
    answerArray: [],
    currentAnswer: {}
  },
  answerTranslations: {
    isFetching: false,
    currentTranslationList: [],
    currentTranslation: {},
  },
  questions: {
    isFetching: false,
    translateLanguageId: 1,
    questionArray: [],
    currentQuestion: {},
  },
  questionTranslations: {
    isFetching: false,
    currentTranslationList: [],
    currentTranslation: {},
  },
  comments: {
    isFetching: false,
    currentCommentList: [],
    currentComment: {}
  },
  commentTranslations: {
    isFetching: false,
    currentTranslationList: [],
    currentTranslation: {},
  },
  not_translate: {
    isFetching: false,
    questions: [],
    answers: [],
    comments: [],
  },
  votes: {
    isFetching: false,
    status: [],
  },
  voteTranslations: {
    isFetching: false,
    status: [],
  },
};
