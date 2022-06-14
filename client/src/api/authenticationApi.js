import axiosClient from './axiosClient';

const authenticationApi = {
    login: (data) => {
        return axiosClient.post('/auth/login', data);
    },
    validateToken: (data) => {
        return axiosClient.get('/auth/validateToken', { headers: { Authorization: 'Bearer ' + data } });
    },
};

export default authenticationApi;
