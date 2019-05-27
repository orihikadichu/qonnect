import axios from 'axios';

const apiUrl = '/api/question_translations';

export const fetchQuestionTranslationList = (question_id) => {
  return axios.get(apiUrl, {
    params: { question_id }
  });
};

export const fetchQuestionTranslation = (id) => {
  return axios.get(`${apiUrl}/${id}`);
};

export const postQuestionTranslationData = (postData) => {
  const {
    content,
    user_id,
    question_id,
    translate_language_id
  } = postData;
  return axios.post(apiUrl, {
    content,
    user_id,
    question_id,
    translate_language_id
  });
};

export const saveQuestionTranslationData = (saveData) => {
  const { id } = saveData;
  return axios.put(`${apiUrl}/${id}`, saveData);
};

export const deleteQuestionTranslation= (params) => {
  const { id } = params;
  return axios.delete(`${apiUrl}/${id}`, { params });
};
