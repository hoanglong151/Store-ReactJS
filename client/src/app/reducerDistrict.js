import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import districtsApi from '~/api/districtsApi';

export const getDistricts = createAsyncThunk('district/getDistricts', async () => {
    try {
        const districts = await districtsApi.getAll();
        return districts;
    } catch (err) {
        console.log('Error of Districts: ', err);
    }
});

const districtSlice = createSlice({
    name: 'district',
    initialState: {
        districts: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDistricts.fulfilled, (state, action) => {
            state.districts = action.payload;
        });
    },
});

export default districtSlice.reducer;
