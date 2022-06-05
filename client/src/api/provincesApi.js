import axiosClient from './axiosClient';

const provincesApi = {
    getAll: () => {
        return axiosClient.get('/provinces');
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
