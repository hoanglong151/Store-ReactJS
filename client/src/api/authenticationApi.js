import axiosClient from './axiosClient';

const authenticationApi = {
    login: (data) => {
        return axiosClient.post('/auth/login', data);
    },
    validateToken: () => {
        return axiosClient.get('/auth/validateToken');
    },
};

export default authenticationApi;
