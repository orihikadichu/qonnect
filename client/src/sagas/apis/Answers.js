import axios from 'axios';

export const fetchAnswer = (id) => {
  return axios.get(`/api/answers/${id}`);
};

export const fetchAnswerList = (params) => {
  return axios.get(`/api/answers/`, {
    params
  });
};

export const postAnswerData = (params) => {
  return axios.post('/api/answers', params);
};

export const saveAnswerData = (saveData) => {
  const { answer_id } = saveData;
  return axios.put(`/api/answers/${answer_id}`, saveData);
};

export const deleteAnswerData = (params) => {
  const { answer_id } = params;
  return axios.delete(`/api/answers/${answer_id}`, { params });
};
