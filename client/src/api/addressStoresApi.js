import axiosClient from './axiosClient';

const addressStoresApi = {
    getAll: () => {
        return axiosClient.get('/addressStores');
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
};

export default addressStoresApi;
