import axios from 'axios';

// 未翻訳のコンテンツ一覧取得するAPI
// export const fetchNotTranslated = (params) => {
//     return axios.get('/api/nottranslated', {
//         params
//     });
// };

// 未翻訳の質問一覧取得するAPI
export const fetchNotTranslatedQuestions = (params) => {
    return axios.get('/api/nottranslatedquestions', {
        params
    });
};

// 未翻訳の回答一覧取得するAPI
export const fetchNotTranslatedAnswers = (params) => {
    return axios.get('/api/nottranslatedanswers', {
        params
    });
};

// 未翻訳のコメント一覧取得するAPI
export const fetchNotTranslatedComments = (params) => {
    return axios.get('/api/nottranslatedcomments', {
        params
    });
};

