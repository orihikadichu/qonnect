import axios from 'axios';

export const fetchCommentsList = (params) => {
    return axios.get('/api/comments', {
        params
    });
};

export const fetchComment = (id) => {
    return axios.get(`/api/comments/${id}`);
};

export const postCommentData = (postData) => {
    return axios.post('/api/comments', postData);
};

export const saveCommentData = (saveData) => {
  const { comment_id } = saveData;
  return axios.put(`/api/comments/${comment_id}`, saveData);
};

export const deleteCommentData = (params) => {
  const { comment_id } = params;
  return axios.delete(`/api/comments/${comment_id}`, { params });
};
