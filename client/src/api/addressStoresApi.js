import axiosClient from './axiosClient';

const addressStoresApi = {
    getAll: (page) => {
        return axiosClient.get(`/addressStores?page=${page}`);
    },
    addAddressStore: (data) => {
        return axiosClient.post('/addressStores/addAddressStore', data);
    },
    deleteAddressStore: (id) => {
        return axiosClient.delete(`/addressStores/deleteAddressStore/${id}`);
    },
    editAddressStore: (data, id) => {
        return axiosClient.patch(`/addressStores/editAddressStore/${id}`, data);
    },
    searchAddressStore: (data, pageSize) => {
        return axiosClient.get(`/addressStores/searchAddressStore?q=${encodeURIComponent(data)}&size=${pageSize}`, {
            headers: { Authorization: null },
        });
    },
};

export default addressStoresApi;
