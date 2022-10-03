import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { TaskState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getPosition = createAsyncThunk(
  'position/getPosition',
  async (params: CallableFunction) => {
    
    // return {response, params}
  },
)

const controlSlice = createSlice({
  name: 'position',
  initialState: {
    variant_table: [ { id: 1, title: 'Все' }, { id:2 , title: 'Неделя' }, { id: 3, title: 'День' }],
    current_variant_table: 1,
    loading: false,

    // for sidebar
    isVisibleSideBar: false,
  },
  reducers: {
    setCurrentVariantTable(state:TaskState, action:any){
        state.current_variant_table = action.payload
    },
    changeVisibleSideBar(state:TaskState){
      state.isVisibleSideBar = !state.isVisibleSideBar
  }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosition.pending, (state:TaskState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getPosition.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
        
    });
    builder.addCase(getPosition.rejected, (state:TaskState) => {
        state.loading = false
    });
  },
});

export default controlSlice.reducer;
export const { setCurrentVariantTable, changeVisibleSideBar } = controlSlice.actions;