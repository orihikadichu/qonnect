import {
    CHANGE_ANSWER_FORM_CONTENT,
    REQUEST_DATA,
    RECEIVE_DATA_SUCCESS,
    RECEIVE_SINGLE_DATA_SUCCESS,
    RECEIVE_DATA_FAILED,
    INITIALIZE_FORM,
    POST_ANSWER_DATA
} from '../actions/Answer';
import { initialState } from '../constants';

export const form = (state = initialState.answerForm, action) => {
    switch (action.type) {
    case CHANGE_ANSWER_FORM_CONTENT:
        return {
            ...state,
            content: action.payload,
        };
    case POST_ANSWER_DATA:
        return {
            ...state
        };
    case REQUEST_DATA:
        return {
            ...state,
            isFetching: true,
        };
    case RECEIVE_DATA_SUCCESS:
        return {
            ...state,
            isFetching: false,
        };
    case RECEIVE_DATA_FAILED:
        return {
            ...state,
            isFetching: false,
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

export const list = (state = initialState.answers, action) => {
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
            answerArray: action.payload.data
        };
    case RECEIVE_SINGLE_DATA_SUCCESS:
        return {
            ...state,
            isFetching: false,
            currentAnswer: action.payload.data
        };
    case RECEIVE_DATA_FAILED:
        return {
            ...state,
            isFetching: false,
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
