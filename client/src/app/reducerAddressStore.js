import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import addressStoresApi from '~/api/addressStoresApi';

export const getAddressStores = createAsyncThunk('district/getAddressStores', async () => {
    try {
        const addressStores = await addressStoresApi.getAll();
        return addressStores;
    } catch (err) {
        console.log('Error of addressStores: ', err);
    }
});

const addressStoreSlice = createSlice({
    name: 'addressStore',
    initialState: {
        addressStores: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddressStores.fulfilled, (state, action) => {
            state.addressStores = action.payload;
        });
    },
});

export default addressStoreSlice.reducer;
