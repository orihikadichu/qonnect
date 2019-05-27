import axios from 'axios';

const apiUrl = '/api/answer_translations';

export const fetchAnswerTranslationList = (answer_id) => {
  return axios.get(apiUrl, {
    params: { answer_id }
  });
};

export const fetchAnswerTranslation = (id) => {
  return axios.get(`${apiUrl}/${id}`);
};

export const postAnswerTranslationData = (postData) => {
  const {
    content,
    user_id,
    answer_id,
    translate_language_id
  } = postData;
  return axios.post(apiUrl, {
    content,
    user_id,
    answer_id,
    translate_language_id
  });
};

export const saveAnswerTranslationData = (saveData) => {
  const { id } = saveData;
  return axios.put(`${apiUrl}/${id}`, saveData);
};

export const deleteAnswerTranslation= (params) => {
  const { id } = params;
  return axios.delete(`${apiUrl}/${id}`, { params });
};
