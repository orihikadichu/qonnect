import axios from 'axios';

export const fetchVote = (params) => {
    return axios.get('/api/votes', {
        params
    });
};

export const postVotes = (postData) => {
    return axios.post('/api/votes', postData);
};

