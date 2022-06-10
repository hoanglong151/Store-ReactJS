import axiosClient from './axiosClient';

const billsApi = {
    paymentBill: (data) => {
        return axiosClient.post('/bills/paymentBill', data);
    },
    getAll: () => {
        return axiosClient.get('/bills');
    },
    updateBill: (data) => {
        return axiosClient.patch('/bills/updateBill', data);
    },
    findBill: (data) => {
        return axiosClient.post('/bills/findBill', data);
    },
};

export default billsApi;
