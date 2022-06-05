import axiosClient from './axiosClient';

const areasApi = {
    getAll: () => {
        return axiosClient.get('/areas');
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
};

export default areasApi;
