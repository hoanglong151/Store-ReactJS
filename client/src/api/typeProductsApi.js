import axiosClient from './axiosClient';

const typeProductsApi = {
    getAll: (page) => {
        return axiosClient.get(`/typeProducts?page=${page}`);
    },
    searchTypeProduct: (data, pageSize) => {
        return axiosClient.get(`/typeProducts/searchTypeProduct?q=${encodeURIComponent(data)}&size=${pageSize}`, {
            headers: { Authorization: null },
        });
    },
};

export default typeProductsApi;
