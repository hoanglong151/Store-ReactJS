import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '~/api';

const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const response = await productsApi.getAll();
    return response;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        totalPage: 1,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return {
                ...state,
                products: action.payload.products,
                totalPage: action.payload.totalPage,
            };
        });
    },
});

export { fetchProducts };
export default productSlice.reducer;
