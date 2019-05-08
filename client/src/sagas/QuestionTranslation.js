import { takeEvery, call, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import {
    requestData,
    receiveDataSuccess,
    receiveSingleDataSuccess,
    receiveDataFailed
} from '../actions/QuestionTranslation';
import {
    FETCH_QUESTION_TRANSLATION_LIST,
    POST_QUESTION_TRANSLATION_DATA
} from '../actions/QuestionTranslation';
import { fetchQuestionTranslationList, fetchQuestionTranslation, postQuestionTranslationData } from './apis/QuestionTranslations';

export function* handleFetchQuestionTranslationList(action) {
    try {
        // axios.get()を呼ぶ前にisFetchingをtrueにしておく
        yield put(requestData());
        const payload = yield call(fetchQuestionTranslationList, action.payload);
        yield put(receiveDataSuccess(payload));
    } catch (e) {
        // isFetchingをfalse
        yield put(receiveDataFailed());
    }
}

export function* handleFetchQuestionById(action) {
    try {
        const id = action.payload;
        yield put(requestData());
        const payload = yield call(fetchQuestionTranslation, id);
        yield put(receiveSingleDataSuccess(payload));
    } catch (e) {
        yield put(receiveDataFailed());
    }
}

export function* postQuestionTranslation(action) {
    try {
        const { question_id } = action.payload;
        yield put(requestData());
        yield call(postQuestionTranslationData, action.payload);
        const payload = yield call(fetchQuestionTranslationList, question_id);
        yield put(receiveDataSuccess(payload));
        yield put(reset('questionTranslationForm'));
    } catch (e) {
        yield put(receiveDataFailed());
    }
}

const questionTranslationSagas = [
    takeEvery(POST_QUESTION_TRANSLATION_DATA, postQuestionTranslation),
    takeEvery(FETCH_QUESTION_TRANSLATION_LIST, handleFetchQuestionTranslationList),
];

export default questionTranslationSagas;
