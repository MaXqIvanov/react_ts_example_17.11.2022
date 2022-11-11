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
  'control/getPosition',
  async (params: any, {getState}:any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
    let company:any = localStorage.getItem('WT_company')
    const response = await api.get(`companies/companies/positions_list/${JSON.parse(company).id}`)
    return {response}
  },
)
// tasks/reports/10/approve/
export const taskApprove = createAsyncThunk(
  'control/taskApprove',
  async (params: any, {getState}:any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
    const response = await api.post(`tasks/reports/${getState().control.controls_task_current.id}/approve/`)
    return {response, params}
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
    controls_task_current: {} as any,
    controls_task_index: 0,
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
    },
    setControlsTaskCurrent(state: ControlState, action:any){
      state.controls_task_current = action.payload.task_current
      state.controls_task_index = action.payload.index
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
    // taskApprove
    builder.addCase(taskApprove.pending, (state:ControlState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(taskApprove.fulfilled, (state:ControlState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status < 300){
        state.controls_task_all.splice(state.controls_task_index, 1)
        state.isVisibleSideBar = false
      }
      state.loading = false
    });
    builder.addCase(taskApprove.rejected, (state:ControlState) => {
      state.loading = false
    });
  },
});

export default controlSlice.reducer;
export const { changeVisibleSideBar, changePagesControl, selectCurrentPosition, setControlsTaskCurrent } = controlSlice.actions;