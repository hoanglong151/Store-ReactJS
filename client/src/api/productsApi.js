import axiosClient from './axiosClient';

const productsApi = {
    getAll: (page) => {
        return axiosClient.get(`/products?page=${page}`);
    },
    addProduct: (data) => {
        return axiosClient.post('/products/addProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    editProduct: (data) => {
        return axiosClient.patch('/products/editProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    deleteProduct: (data) => {
        return axiosClient.delete(`/products/deleteProduct/${data}`);
    },
    searchProduct: (data) => {
        return axiosClient.get(`/products/searchProduct?q=${encodeURIComponent(data)}`, {
            headers: { Authorization: null },
        });
    },
};

export default productsApi;
