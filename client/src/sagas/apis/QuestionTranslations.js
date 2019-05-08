import axios from 'axios';

export const fetchQuestionTranslationList = (question_id) => {
    return axios.get(`/api/question_translations`, {
        params: { question_id }
    });
};

export const fetchQuestionTranslation = (id) => {
    return axios.get(`/api/question_translations/${id}`);
};

export const postQuestionTranslationData = (postData) => {
    const {
        content,
        user_id,
        question_id,
        translate_language_id
    } = postData;
    return axios.post('/api/question_translations', {
        content,
        user_id,
        question_id,
        translate_language_id
    });
};
