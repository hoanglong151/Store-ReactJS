import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import areasApi from '~/api/areasApi';

export const getAreas = createAsyncThunk('area/getAreas', async () => {
    try {
        const areas = await areasApi.getAll();
        return areas;
    } catch (err) {
        console.log('Error of Areas: ', err);
    }
});

const areaSlice = createSlice({
    name: 'area',
    initialState: {
        areas: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAreas.fulfilled, (state, action) => {
            state.areas = action.payload;
        });
    },
});

export default areaSlice.reducer;
