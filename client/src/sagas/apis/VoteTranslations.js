import axios from 'axios';

export const postVotes = (params) => {
    return axios.post('/api/vote_translations', params);
};

export const deleteVotes = (params) => {
    const { vote_id } = params;
    return axios.delete(`/api/vote_translations/${vote_id}`, { params });
};