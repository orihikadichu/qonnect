import axios from 'axios';

export const fetchAnswerTranslationList = (answer_id) => {
    return axios.get('/api/answer_translations', {
        params: {
            answer_id
        }
    });
};

export const fetchAnswerTranslation = (id) => {
    return axios.get(`/api/answer_translations/${id}`);
};

export const postAnswerTranslationData = (postData) => {
    const {
        content,
        user_id,
        answer_id,
        translate_language_id
    } = postData;
    return axios.post('/api/answer_translations', {
        content,
        user_id,
        answer_id,
        translate_language_id
    });
};
