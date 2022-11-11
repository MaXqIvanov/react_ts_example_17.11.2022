import { RootState } from './store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { ControlState } from '../ts/anyTypes';
import moment from 'moment';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getControlTaskAll = createAsyncThunk(
  'control/getControlTaskAll',
  async (params: any, {getState}: any) => {
    // alert(`Загрузка задач в разделе контроль страница ${getState().control.current_page}`)
    let current_month = moment().toDate().getMonth() + 1
    let current_day = moment().toDate().getDate()
    let current_year = moment().toDate().getFullYear()
    let company:any = localStorage.getItem('WT_company')

    const response = await api.get(`tasks/reports/?is_approve=${params.is_approve}${getState().control.position_current.id ? '&task_position='+ getState().control.position_current.id : ''}&task__company=${JSON.parse(company).id}&date=${current_day}.${current_month}.${current_year}`)
    return {response}
  },
)
export const getPosition = createAsyncThunk(
  'position/getPosition',
  async (params: any, {getState}:any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
    let company:any = localStorage.getItem('WT_company')
    const response = await api.get(`companies/companies/positions_list/${JSON.parse(company).id}`)
    return {response}
  },
)

const controlSlice = createSlice({
  name: 'control',
  initialState: {
    loading: false,

    position_all: [],
    position_current: {} as any,
    // for sidebar
    isVisibleSideBar: false,
    // get control data for table
    controls_task_all: [],
    current_page: 1,
    all_pages: 10,

  },
  reducers: {
    changeVisibleSideBar(state:ControlState){
      state.isVisibleSideBar = !state.isVisibleSideBar
    },
    changePagesControl(state:ControlState, action:any){
      let current_page = state.current_page + action.payload
      if(current_page > 0 && current_page <= state.all_pages){
        state.current_page = current_page
      }
    },
    selectCurrentPosition(state: ControlState, action:any){
      state.position_current = action.payload.current_position
      action.payload.setIsVisibleSelect(false)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getControlTaskAll.pending, (state:ControlState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getControlTaskAll.fulfilled, (state:ControlState,  { payload }:PayloadAction<any>) => {
      if(payload.response.status <300){
        state.controls_task_all = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getControlTaskAll.rejected, (state:ControlState) => {
        state.loading = false
    });

    builder.addCase(getPosition.pending, (state:ControlState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getPosition.fulfilled, (state:ControlState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      
      state.position_all = payload.response.data
      state.loading = false
    });
    builder.addCase(getPosition.rejected, (state:ControlState) => {
      state.loading = false
    });
  },
});

export default controlSlice.reducer;
export const { changeVisibleSideBar, changePagesControl, selectCurrentPosition } = controlSlice.actions;