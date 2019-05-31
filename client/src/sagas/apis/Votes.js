import axios from 'axios';

export const fetchVote = (params) => {
    return axios.get('/api/votes', {
        params
    });
};

export const postVotes = (postData) => {
    return axios.post('/api/votes', postData);
};

export const deleteVotes = (params) => {
    const { vote_id } = params;
    return axios.delete(`/api/votes/${vote_id}`, { params });
};

