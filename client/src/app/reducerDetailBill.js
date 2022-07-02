import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { detailBillsApi } from '~/api';

const fetchDetailBills = createAsyncThunk('detailBill/fetchDetailBills', async () => {
    const response = await detailBillsApi.getBillByStatusCount();
    return response;
});

const detailBillSlice = createSlice({
    name: 'detailBill',
    initialState: {
        detailBills: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDetailBills.fulfilled, (state, action) => {
            return {
                ...state,
                detailBills: action.payload.billByStatus,
            };
        });
    },
});

export { fetchDetailBills };
export default detailBillSlice.reducer;
