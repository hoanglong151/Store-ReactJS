import axiosClient from './axiosClient';

const areasApi = {
    getAll: (page) => {
        return axiosClient.get(`/areas?page=${page}`);
    },
    addArea: (data) => {
        return axiosClient.post('/areas/addArea', data);
    },
    deleteArea: (id) => {
        return axiosClient.delete(`/areas/deleteArea/${id}`);
    },
    editArea: (data, id) => {
        return axiosClient.patch(`/areas/editArea/${id}`, data);
    },
    searchArea: (data, pageSize) => {
        return axiosClient.get(`/areas/searchArea?q=${encodeURIComponent(data)}&size=${pageSize}`, {
            headers: { Authorization: null },
        });
    },
};

export default areasApi;
