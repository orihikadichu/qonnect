import axios from 'axios';

const apiUrl = '/api/comment_translations';

export const fetchCommentTranslationList = (comment_id) => {
  return axios.get(apiUrl, {
    params: {
      comment_id
    }
  });
};

export const fetchCommentTranslation = (id) => {
  return axios.get(`${apiUrl}/${id}`);
};

export const postCommentTranslationData = (params) => {
  return axios.post(apiUrl, {
    params
  });
};

export const saveCommentTranslationData = (saveData) => {
  const { id } = saveData;
  return axios.put(`${apiUrl}/${id}`, saveData);
};

export const deleteCommentTranslation = (params) => {
  const { id } = params;
  return axios.delete(`${apiUrl}/${id}`, { params });
};
