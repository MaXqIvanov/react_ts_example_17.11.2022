import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { PositionState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getPosition = createAsyncThunk(
  'position/getPosition',
  async (params: any, {getState}:any) => {
    alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
    const response = await api.get(`v1/images/search`)
    return {response}
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
    // for pagination
    current_page: 1,
    all_pages: 10,
  },
  reducers: {
    setCurrentVariantTable(state:PositionState, action:any){
        state.current_variant_table = action.payload
    },
    changeVisibleSideBar(state:PositionState){
      state.isVisibleSideBar = !state.isVisibleSideBar
    },
    changePages(state:PositionState, action:any){
      let current_page = state.current_page + action.payload
      if(current_page > 0 && current_page <= state.all_pages){
        state.current_page = current_page
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosition.pending, (state:PositionState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getPosition.fulfilled, (state:PositionState,  { payload }:PayloadAction<any>) => {
      
      state.loading = false
    });
    builder.addCase(getPosition.rejected, (state:PositionState) => {
      state.loading = false
    });
  },
});

export default controlSlice.reducer;
export const { setCurrentVariantTable, changeVisibleSideBar, changePages } = controlSlice.actions;