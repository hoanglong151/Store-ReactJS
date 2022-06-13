import axiosClient from './axiosClient';

const firmsApi = {
    getAll: () => {
        return axiosClient.get('/firms');
    },
    addFirm: (data) => {
        return axiosClient.post('/firms/addFirm', data, {
            headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') },
        });
    },
    editFirm: (data, id) => {
        return axiosClient.patch(`/firms/editFirm/${id}`, data);
    },
    deleteFirm: (id) => {
        return axiosClient.delete(`/firms/deleteFirm/${id}`);
    },
};

export default firmsApi;
