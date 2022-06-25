import axiosClient from './axiosClient';

const typeProductsApi = {
    getAll: (page) => {
        return axiosClient.get(`/typeProducts?page=${page}`);
    },
};

export default typeProductsApi;
