import axiosClient from './axiosClient';

const authenticationApi = {
    login: (data) => {
        return axiosClient.post('/auth/login', data);
    },
    validateToken: () => {
        return axiosClient.get('/auth/validateToken');
    },
    verifyOTP: (data) => {
        return axiosClient.post('/auth/verifyOTP', data);
    },
};

export default authenticationApi;
