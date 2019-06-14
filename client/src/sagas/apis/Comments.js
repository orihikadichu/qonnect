import axios from 'axios';
const apiUrl = '/api/comments';

export const fetchCommentWithUserList = (params) => {
  return axios.get(`/api/comments_with_User`, {
    params
  });
}

export const fetchCommentsList = (params) => {
    return axios.get(apiUrl, {
        params
    });
};

export const fetchComment = (id) => {
    return axios.get(`${apiUrl}/${id}`);
};

export const fetchCommentListWithAnswer = (params) => {
  return axios.get(`${apiUrl}_with_answer`, {
    params
  });
};

export const postCommentData = (postData) => {
    return axios.post(apiUrl, postData);
};

export const saveCommentData = (saveData) => {
  const { comment_id } = saveData;
  return axios.put(`${apiUrl}/${comment_id}`, saveData);
};

export const deleteCommentData = (params) => {
  const { comment_id } = params;
  return axios.delete(`${apiUrl}/${comment_id}`, { params });
};
