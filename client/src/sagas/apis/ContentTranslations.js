import axios from 'axios';

export const fetchContentTranslation = ( params ) => {
    return axios.get(`/api/content_translations`,{
      params
    });
};