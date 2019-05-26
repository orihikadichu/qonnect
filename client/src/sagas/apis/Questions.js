import axios from 'axios';

export const fetchQuestionList = (params) => {
    return axios.get('/api/questions', {
        params
    });
};

// 未翻訳一覧を取得するAPI
export const fetchNotTranslated = (params) => {
  return axios.get('/api/nottranslated', {
      params
  });
};

export const fetchQuestion = (id) => {
    return axios.get(`/api/questions/${id}`);
};

export const postQuestionData = (postData) => {
    return axios.post('/api/questions', postData);
};

export const saveQuestionData = (postData) => {
  const { question_id } = postData;
  return axios.put(`/api/questions/${question_id}`, postData);
};

export const deleteQuestionData = (params) => {
  const { question_id } = params;
  return axios.delete(`/api/questions/${question_id}`, { params });
};
