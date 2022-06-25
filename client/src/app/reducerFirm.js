import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firmsApi } from '~/api';

const fetchFirms = createAsyncThunk('firm/fetchFirms', async () => {
    const response = await firmsApi.getAll();
    return response;
});

const firmSlice = createSlice({
    name: 'firm',
    initialState: {
        firms: [],
        totalPage: 1,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFirms.fulfilled, (state, action) => {
            return {
                ...state,
                firms: action.payload.firms,
                totalPage: action.payload.totalPage,
            };
        });
    },
});

export { fetchFirms };
export default firmSlice.reducer;
