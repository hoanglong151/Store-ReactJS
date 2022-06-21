import axiosClient from './axiosClient';

const provincesApi = {
    getAll: (page) => {
        return axiosClient.get(`/provinces?page=${page}`);
    },
    addProvince: (data) => {
        return axiosClient.post('/provinces/addProvince', data);
    },
    deleteProvince: (id) => {
        return axiosClient.delete(`/provinces/deleteProvince/${id}`);
    },
    editProvince: (data, id) => {
        return axiosClient.patch(`/provinces/editProvince/${id}`, data);
    },
};

export default provincesApi;
