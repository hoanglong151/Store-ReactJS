import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoriesApi from '~/api/categoriesApi';

export const getCategories = createAsyncThunk('category/getCategories', async () => {
    try {
        const categories = await categoriesApi.getAll();
        return categories;
    } catch (err) {
        console.log('Error of Categories: ', err);
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export default categorySlice.reducer;
