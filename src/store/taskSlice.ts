import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { TaskState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getTask = createAsyncThunk(
  'task/getTask',
  async (params:any) => {
    const response = await api.get(`/users`)
    return {response}
  },
)

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    // loading
    loading: false,
    // for work
    variant_table: [ { id: 1, title: 'Все' }, { id:2 , title: 'Неделя' }, { id: 3, title: 'День' }],
    current_variant_table: 1,
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
    builder.addCase(getTask.pending, (state:TaskState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getTask.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
        
    });
    builder.addCase(getTask.rejected, (state:TaskState) => {
        state.loading = false
    });
  },
});

export default taskSlice.reducer;
export const { setCurrentVariantTable, changeVisibleSideBar } = taskSlice.actions;