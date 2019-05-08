import {
    CHANGE_FORM_CONTENT,
    CHANGE_FORM_LANGUAGE,
    POST_QUESTION_TRANSLATION_DATA,
    INITIALIZE_FORM,
    REQUEST_DATA,
    RECEIVE_DATA_SUCCESS,
    RECEIVE_SINGLE_DATA_SUCCESS,
    RECEIVE_DATA_FAILED
} from '../actions/QuestionTranslation';
import { initialState } from '../constants';

export const form = (state = initialState.questionTranslationForm, action) => {
    switch (action.type) {
    case CHANGE_FORM_CONTENT:
        return {
            ...state,
            content: action.payload,
        };
    case CHANGE_FORM_LANGUAGE:
        return {
            ...state,
            translate_language_id: action.payload,
        };
    case POST_QUESTION_TRANSLATION_DATA:
        return {
            ...state
        };
    case INITIALIZE_FORM:
        return {
            ...state,
            content: ''
        };
    default:
        return state;
    }

};

export const list = (state = initialState.questionTranslations, action) => {
    switch (action.type) {
    case REQUEST_DATA:
        return {
            ...state,
            isFetching: true,
        };
    case RECEIVE_DATA_SUCCESS:
        return {
            ...state,
            isFetching: false,
            currentTranslationList: action.payload.data
        };
    case RECEIVE_DATA_FAILED:
        return {
            ...state,
            isFetching: false
        };
    default:
        return state;
    }
};
