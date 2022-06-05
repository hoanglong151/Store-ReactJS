import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import saleCodesApi from '~/api/saleCodesApi';

export const getSaleCodes = createAsyncThunk('area/getSaleCodes', async () => {
    try {
        const saleCodes = await saleCodesApi.getAll();
        return saleCodes;
    } catch (err) {
        console.log('Error of saleCodes: ', err);
    }
});

const saleCodeSlice = createSlice({
    name: 'saleCode',
    initialState: {
        saleCodes: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSaleCodes.fulfilled, (state, action) => {
            state.saleCodes = action.payload;
        });
    },
});

export default saleCodeSlice.reducer;
