import axiosClient from './axiosClient';

const billsApi = {
    paymentBill: (data) => {
        return axiosClient.post('/bills/paymentBill', data);
    },
    getAll: () => {
        return axiosClient.get('/bills');
    },
};

export default billsApi;
