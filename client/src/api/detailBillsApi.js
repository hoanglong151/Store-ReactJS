import axiosClient from './axiosClient';

const detailBillsApi = {
    getBillByStatusCount: () => {
        return axiosClient.get('/detailBills/getBillByStatusCount');
    },
    updateBillStatus: (data) => {
        return axiosClient.patch('/detailBills/updateBillStatus', data);
    },
};

export default detailBillsApi;
