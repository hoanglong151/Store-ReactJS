import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi } from '~/api';

const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    const response = await categoriesApi.getAll();
    return response;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        totalPage: 1,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            return {
                ...state,
                categories: action.payload.categories,
                totalPage: action.payload.totalPage,
            };
        });
    },
});

export { fetchCategories };
export default categorySlice.reducer;
