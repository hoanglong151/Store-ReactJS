import axiosClient from './axiosClient';

const saleCodesApi = {
    getAll: (page) => {
        return axiosClient.get(`/saleCodes?page=${page}`);
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
    searchSaleCode: (data, pageSize) => {
        return axiosClient.get(`/saleCodes/searchSaleCode?q=${encodeURIComponent(data)}&size=${pageSize}`, {
            headers: { Authorization: null },
        });
    },
};

export default saleCodesApi;
