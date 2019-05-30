import axios from 'axios';

export const fetchVote = (params) => {
    return axios.get('/api/vote_translations', {
        params
    });
};

export const postVotes = (postData) => {
    return axios.post('/api/vote_translations', postData);
};