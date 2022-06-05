import axiosClient from './axiosClient';

const districtsApi = {
    getAll: () => {
        return axiosClient.get('/districts');
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
