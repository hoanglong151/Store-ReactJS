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
    searchProvince: (data, pageSize) => {
        return axiosClient.get(`/provinces/searchProvince?q=${encodeURIComponent(data)}&size=${pageSize}`, {
            headers: { Authorization: null },
        });
    },
};

export default provincesApi;
