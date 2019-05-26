import axios from 'axios';

const apiUrl = '/api/answers';

export const fetchAnswer = (id) => {
  return axios.get(`${apiUrl}/${id}`);
};

export const fetchAnswerList = (params) => {
  return axios.get(apiUrl, {
    params
  });
};

export const fetchAnswerListWithQuestion = (params) => {
  return axios.get(`${apiUrl}_with_question`, {
    params
  });
};

export const postAnswerData = (params) => {
  return axios.post(apiUrl, params);
};

export const saveAnswerData = (saveData) => {
  const { answer_id } = saveData;
  return axios.put(`${apiUrl}/${answer_id}`, saveData);
};

export const deleteAnswerData = (params) => {
  const { answer_id } = params;
  return axios.delete(`${apiUrl}/${answer_id}`, { params });
};
