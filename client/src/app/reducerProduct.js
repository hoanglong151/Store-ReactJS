import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsApi from '~/api/productApi';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
    try {
        const products = await productsApi.getAll();
        return products;
    } catch (err) {
        console.log('Error of Product: ', err);
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export default productSlice.reducer;
