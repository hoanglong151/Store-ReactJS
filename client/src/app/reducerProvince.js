import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import provincesApi from '~/api/provincesApi';

export const getProvinces = createAsyncThunk('province/getProvinces', async () => {
    try {
        const provinces = await provincesApi.getAll();
        return provinces;
    } catch (err) {
        console.log('Error of Provinces: ', err);
    }
});

const provinceSlice = createSlice({
    name: 'province',
    initialState: {
        provinces: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProvinces.fulfilled, (state, action) => {
            state.provinces = action.payload;
        });
    },
});

export default provinceSlice.reducer;
