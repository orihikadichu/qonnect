export const initialState = {
  signUp: {
    mail: '',
    password: '',
    mnemonic: '',
    hash: '',
  },
  profile: {
    isFething: false,
    user: {}
  },
  auth: {
    isPrepared: false,
    isFething: false,
    isLoggedIn: false,
    user: {},
    jwt: ''
  },
  answerForm: {
    content: '',
    translate_language_id: 1,
    isFetching: false,
  },
  answerTranslationForm: {
    isFetching: false,
    translate_language_id: 1,
    content: '',
  },
  answers: {
    isFetching: false,
    answerArray: [],
    currentAnswer: {}
  },
  answerTranslations: {
    isFetching: false,
    currentTranslationList: [],
  },
  questionForm: {
    isFetching: false,
    content: '',
    translate_language_id: 1,
  },
  questionTranslationForm: {
    content: '',
    translate_language_id: 1,
    isFetching: false,
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
  },
  comments: {
    isFetching: false,
    currentCommentList: [],
    currentComment: {}
  },
  commentTranslations: {
    isFetching: false,
    currentTranslationList: [],
  },
};
