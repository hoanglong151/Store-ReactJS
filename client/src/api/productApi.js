import axiosClient from "./axiosClient";

const productsApi = {
    getAll: () => {
        return axiosClient.get('/products')
    },
    addProduct: (data) => {
        return axiosClient.post('/products/addProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    editProduct: (data) => {
        return axiosClient.patch('/products/editProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    deleteProduct: (data) => {
        return axiosClient.delete(`/products/deleteProduct/${data}`)
    }
}

export default productsApi;
