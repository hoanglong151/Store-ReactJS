import axiosClient from './axiosClient';

const authenticationApi = {
    login: (data) => {
        return axiosClient.post('/auth/login', data);
    },
};

export default authenticationApi;
