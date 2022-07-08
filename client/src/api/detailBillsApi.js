import axiosClient from './axiosClient';

const detailBillsApi = {
    getBillByStatusCount: () => {
        return axiosClient.get('/detailBills/getBillByStatusCount');
    },
    getAll: () => {
        return axiosClient.get('/detailBills/getAll');
    },
    updateBillStatus: (data) => {
        return axiosClient.patch('/detailBills/updateBillStatus', data);
    },
};

export default detailBillsApi;
