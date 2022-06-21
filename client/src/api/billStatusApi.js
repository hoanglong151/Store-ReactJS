import axiosClient from './axiosClient';

const billStatusApi = {
    getAll: (page) => {
        return axiosClient.get(`/billStatus?page=${page}`);
    },
    addBillStatus: (data) => {
        return axiosClient.post('/billStatus/addBillStatus', data);
    },
    deleteBillStatus: (id) => {
        return axiosClient.delete(`/billStatus/deleteBillStatus/${id}`);
    },
    editBillStatus: (data, id) => {
        return axiosClient.patch(`/billStatus/editBillStatus/${id}`, data);
    },
};

export default billStatusApi;
