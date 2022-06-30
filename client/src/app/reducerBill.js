import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { billsApi } from '~/api';

const fetchBills = createAsyncThunk('bill/fetchBills', async () => {
    const response = await billsApi.getBillPending();
    return response;
});

const billSlice = createSlice({
    name: 'bill',
    initialState: {
        bills: [],
        totalPage: 1,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBills.fulfilled, (state, action) => {
            return {
                ...state,
                bills: action.payload.bills,
                totalPage: action.payload.totalPage,
            };
        });
    },
});

export { fetchBills };
export default billSlice.reducer;
