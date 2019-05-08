import axios from 'axios';

export const createUserAccount = (postData) => {
    return axios.post('/api/users', postData);
};

export const loginUser = (postData) => {
    const username = postData.mail;
    const { password } = postData;

    return axios.post('/api/users/login', {
        username,
        password
    });
};

export const loginUserJwt = (postData) => {
    const { jwt } = postData;
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${jwt}`
    };
    return axios.post('/api/users/login_jwt', {}, { headers });
};

export const saveUserProfile = (postData) => {
    const { user_id, name, profile, country_id, image } = postData;
    let data = new FormData();
    data.append('name', name);
    data.append('profile', profile);
    data.append('country_id', country_id);
    data.append('image', image);
    return axios.put(
        `/api/users/${user_id}`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
};

export const getUser = (user_id) => {
    return axios.get(`/api/users/${user_id}`);
};
