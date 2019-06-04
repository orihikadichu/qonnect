import { locales } from './intl';

const savedLocale = localStorage.getItem('locale');
const currentLocale = savedLocale ? savedLocale : 'ja';


export const initialState = {
  intl: locales[currentLocale],
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
  //未翻訳コメントリスト一覧表示
  not_translate: {
    //api接続中である場合（非同期処理をしている途中）はtrueになる
    isFetching: false,
    questions: [],
    answers: [],
    comments: [],
  },
  //評価機能
  votes: {
    //api接続中である場合（非同期処理をしている途中）はtrueになる
    isFetching: false,
    status: [],
  },
  //評価機能
  voteTranslations: {
    //api接続中である場合（非同期処理をしている途中）はtrueになる
    isFetching: false,
    status: [],
  },
};
