import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { typeProductsApi } from '~/api';

const fetchTypeProducts = createAsyncThunk('typeProduct/fetchTypeProducts', async () => {
    const response = await typeProductsApi.getAll();
    return response;
});

const typeProductsSlice = createSlice({
    name: 'typeProduct',
    initialState: {
        typeProducts: [],
        totalPage: 1,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTypeProducts.fulfilled, (state, action) => {
            return {
                ...state,
                typeProducts: action.payload.typeProducts,
                totalPage: action.payload.totalPage,
            };
        });
    },
});

export { fetchTypeProducts };
export default typeProductsSlice.reducer;
