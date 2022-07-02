import axiosClient from './axiosClient';

const billsApi = {
    paymentBill: (data) => {
        return axiosClient.post('/bills/paymentBill', data);
    },
    getAll: (page) => {
        return axiosClient.get(`/bills?page=${page}`);
    },
    findBill: (data) => {
        return axiosClient.post('/bills/findBill', data);
    },
    searchBill: (data, pageSize) => {
        return axiosClient.get(`/bills/searchBill?q=${encodeURIComponent(data)}&size=${pageSize}`, {
            headers: { Authorization: null },
        });
    },
};

export default billsApi;
