import { takeEvery, call, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import {
    requestData,
    receiveDataSuccess,
    receiveSingleDataSuccess,
    receiveDataFailed,
    initializeForm
} from '../actions/AnswerTranslation';
import {
    FETCH_ANSWER_TRANSLATION_LIST,
    POST_ANSWER_TRANSLATION_DATA
} from '../actions/AnswerTranslation';
import { fetchAnswerTranslation, fetchAnswerTranslationList, postAnswerTranslationData } from './apis/AnswerTranslations';

export function* handleFetchAnswerTranslationList(action) {
    try {
        // axios.get()を呼ぶ前にisFetchingをtrueにしておく
        yield put(requestData());
        const payload = yield call(fetchAnswerTranslationList, action.payload);
        yield put(receiveDataSuccess(payload));
    } catch (e) {
        // isFetchingをfalse
        yield put(receiveDataFailed());
    }
};

export function* handleFetchAnswerTranslationById(action) {
    try {
        const id  = action.payload;
        yield put(requestData());
        const payload = yield call(fetchAnswerTranslation, id);
        console.log('payload', payload);
        yield put(receiveSingleDataSuccess(payload));
    } catch (e) {
        yield put(receiveDataFailed());
    }
};

export function* postAnswerTranslation(action) {
    try {
        const { answer_id } = action.payload;
        yield put(requestData());
        yield call(postAnswerTranslationData, action.payload);
        const payload = yield call(fetchAnswerTranslationList, answer_id);
        yield put(receiveDataSuccess(payload));
        yield put(reset('answerTranslationForm'));
    } catch (e) {
        yield put(receiveDataFailed());
    }
}

const answerTranslationSagas = [
    takeEvery(POST_ANSWER_TRANSLATION_DATA, postAnswerTranslation),
    takeEvery(FETCH_ANSWER_TRANSLATION_LIST, handleFetchAnswerTranslationList),
];

export default answerTranslationSagas;
