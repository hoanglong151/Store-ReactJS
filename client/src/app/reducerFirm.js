import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firmsApi from '~/api/firmsApi';

export const getFirms = createAsyncThunk('category/getFirms', async () => {
    try {
        const firms = await firmsApi.getAll();
        return firms;
    } catch (err) {
        console.log('Error of Firms: ', err);
    }
});

const firmSlice = createSlice({
    name: 'firm',
    initialState: {
        firms: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFirms.fulfilled, (state, action) => {
            state.firms = action.payload;
        });
    },
});

export default firmSlice.reducer;
