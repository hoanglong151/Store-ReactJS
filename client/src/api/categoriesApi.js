import axiosClient from './axiosClient';

const categoriesApi = {
    getAll: () => {
        return axiosClient.get('/categories');
    },
    addCategory: (data) => {
        return axiosClient.post('/categories/addCategory', data);
    },
    deleteCategory: (id) => {
        return axiosClient.delete(`/categories/deleteCategory/${id}`);
    },
    editCategory: (data, id) => {
        return axiosClient.patch(`/categories/editCategory/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export default categoriesApi;
