import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { TaskState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getTaskDay = createAsyncThunk(
  'task/getTaskDay',
  async (params:any, {getState}:any) => {
    console.log(params);
    // alert(`Загрузка данных с бэка раздел день страница ${getState().task.current_page_day}`)
    const response = await api.get(`v1/images/search`)
    return {response}
  },
)

export const getTaskWeek = createAsyncThunk(
  'task/getTaskWeek',
  async (params:any, {getState}:any) => {
    console.log("this getTaskWeek");
    console.log(params);
    // alert(`Загрузка данных с бэка раздел неделя страница ${getState().task.current_page_week}`)
    const response = await api.get(`tasks/execute/to_range/?start=${params.now_day && params.now_day + '.' + params.now_month + '.' + params.now_year}&end=${params.last_day && params.last_day + '.'+params.last_month+'.'+params.last_year}`)
    return {response}
  },
)

export const getTaskAll = createAsyncThunk(
  'task/getTaskAll',
  async (params:any, {getState}:any) => {
    // alert(`Загрузка данных с бэка раздел все страница ${getState().task.current_page_all} `)
    const response = await api.get(`v1/images/search`)
    return {response}
  },
)


const taskSlice = createSlice({
  name: 'task',
  initialState: {
    // loading
    loading: false,
    // for work
    variant_table: [ { id: 1, title: 'Все' }, { id:2 , title: 'Неделя' }, { id: 3, title: 'День' } ],
    current_variant_table: 1,
    // for sidebar
    isVisibleSideBar: false,
    // task for day
    get_all_task_day: [],
    current_task_day: {},
    // task for week
    get_all_task_week: [],
    current_task_week: {},
    // task for all 
    get_all_task_all: [],
    current_task_all: {},

    // for pagination for day
    current_page_day: 1,
    all_pages_day: 10,
    // for pagination for week
    current_page_week: 1,
    all_pages_week: 10,
    // for pagination for all
    current_page_all: 1,
    all_pages_all: 10,
  },
  reducers: {
    setCurrentVariantTable(state:TaskState, action:any){
        state.current_variant_table = action.payload
    },
    changeVisibleSideBar(state:TaskState){
      state.isVisibleSideBar = !state.isVisibleSideBar
    },
    changePagesDay(state:TaskState, action:any){
      let current_page_day = state.current_page_day + action.payload
      if(current_page_day > 0 && current_page_day <= state.all_pages_day){
        state.current_page_day = current_page_day
      }
    },
    changePagesWeek(state:TaskState, action:any){
      let current_page_week = state.current_page_week + action.payload
      if(current_page_week > 0 && current_page_week <= state.all_pages_week){
        state.current_page_week = current_page_week
      }
    },
    changePagesAll(state:TaskState, action:any){
      let current_page_all = state.current_page_all + action.payload
      if(current_page_all > 0 && current_page_all <= state.all_pages_all){
        state.current_page_all = current_page_all
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskDay.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getTaskDay.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
        
      state.loading = false
    });
    builder.addCase(getTaskDay.rejected, (state:TaskState) => {
      state.loading = false
    });

    builder.addCase(getTaskWeek.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getTaskWeek.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status < 300){
        state.get_all_task_week = payload.response.data
      }
      state.loading = false
    });
    builder.addCase(getTaskWeek.rejected, (state:TaskState) => {
      state.loading = false
    });

    builder.addCase(getTaskAll.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getTaskAll.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
      
      state.loading = false
    });
    builder.addCase(getTaskAll.rejected, (state:TaskState) => {
      state.loading = false
    });
  },

  
});

export default taskSlice.reducer;
export const { setCurrentVariantTable, changeVisibleSideBar, changePagesDay, changePagesWeek, changePagesAll } = taskSlice.actions;