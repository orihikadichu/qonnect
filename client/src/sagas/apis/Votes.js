import axios from 'axios';

export const postVotes = (postData) => {
    return axios.post('/api/votes', postData);
};

export const deleteVotes = (params) => {
    const { vote_id } = params;
    return axios.delete(`/api/votes/${vote_id}`, { params });
};

export const fetchQuestionVotesList = (question_id) => {
    return axios.get('/api/votes/questions', {
      params: { question_id }
    });
  };

