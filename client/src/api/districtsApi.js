import axiosClient from './axiosClient';

const districtsApi = {
    getAll: (page) => {
        return axiosClient.get(`/districts?page=${page}`);
    },
    addDistrict: (data) => {
        return axiosClient.post('/districts/addDistrict', data);
    },
    deleteDistrict: (id) => {
        return axiosClient.delete(`/districts/deleteDistrict/${id}`);
    },
    editDistrict: (data, id) => {
        return axiosClient.patch(`/districts/editDistrict/${id}`, data);
    },
};

export default districtsApi;
