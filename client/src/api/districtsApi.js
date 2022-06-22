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
    searchDistrict: (data, pageSize) => {
        return axiosClient.get(`/districts/searchDistrict?q=${encodeURIComponent(data)}&size=${pageSize}`, {
            headers: { Authorization: null },
        });
    },
};

export default districtsApi;
