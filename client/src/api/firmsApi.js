import axiosClient from './axiosClient';

const firmsApi = {
    getAll: (page) => {
        return axiosClient.get(`/firms?page=${page}`);
    },
    addFirm: (data) => {
        return axiosClient.post('/firms/addFirm', data);
    },
    editFirm: (data, id) => {
        return axiosClient.patch(`/firms/editFirm/${id}`, data);
    },
    deleteFirm: (id) => {
        return axiosClient.delete(`/firms/deleteFirm/${id}`);
    },
};

export default firmsApi;
