import axios from 'axios';

export const fetchCommentTranslationList = (comment_id) => {
  return axios.get('/api/comment_translations', {
    params: {
      comment_id
    }
  });
};

export const fetchCommentTranslation = (id) => {
  return axios.get(`/api/comment_translations/${id}`);
};

export const postCommentTranslationData = (params) => {
  return axios.post('/api/comment_translations', {
    params
  });
};
