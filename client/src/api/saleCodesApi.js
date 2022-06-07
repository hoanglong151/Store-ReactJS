import axiosClient from './axiosClient';

const saleCodesApi = {
    getAll: () => {
        return axiosClient.get('/saleCodes');
    },
    addSaleCode: (data) => {
        return axiosClient.post('/saleCodes/addSaleCode', data);
    },
    deleteSaleCode: (id) => {
        return axiosClient.delete(`/saleCodes/deleteSaleCode/${id}`);
    },
    editSaleCode: (data, id) => {
        return axiosClient.patch(`/saleCodes/editSaleCode/${id}`, data);
    },
    applySaleCode: (data) => {
        return axiosClient.post('/saleCodes/applySaleCode', data);
    },
};

export default saleCodesApi;
