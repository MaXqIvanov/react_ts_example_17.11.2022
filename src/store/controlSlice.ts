import { RootState } from './store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { ControlState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getControlTaskAll = createAsyncThunk(
  'control/getControlTaskAll',
  async (params: any, {getState}: any) => {
    alert(`Загрузка задач в разделе контроль страница ${getState().control.current_page}`)
    // return {response, params}
  },
)

const controlSlice = createSlice({
  name: 'control',
  initialState: {
    variant_table: [ { id: 1, title: 'Все' }, { id:2 , title: 'Неделя' }, { id: 3, title: 'День' }],
    current_variant_table: 1,
    loading: false,

    // for sidebar
    isVisibleSideBar: false,
    // get control data for table
    controls_task_all: [],
    current_page: 1,
    all_pages: 10,

  },
  reducers: {
    setCurrentVariantTable(state:ControlState, action:any){
        state.current_variant_table = action.payload
    },
    changeVisibleSideBar(state:ControlState){
      state.isVisibleSideBar = !state.isVisibleSideBar
    },
    changePagesControl(state:ControlState, action:any){
      let current_page = state.current_page + action.payload
      if(current_page > 0 && current_page <= state.all_pages){
        state.current_page = current_page
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getControlTaskAll.pending, (state:ControlState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getControlTaskAll.fulfilled, (state:ControlState,  { payload }:PayloadAction<any>) => {
        
    });
    builder.addCase(getControlTaskAll.rejected, (state:ControlState) => {
        state.loading = false
    });
  },
});

export default controlSlice.reducer;
export const { setCurrentVariantTable, changeVisibleSideBar, changePagesControl } = controlSlice.actions;