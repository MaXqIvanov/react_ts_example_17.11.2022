import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { TaskState } from '../ts/anyTypes';
import moment from 'moment';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getTaskDay = createAsyncThunk(
  'task/getTaskDay',
  async (params:any, {getState}:any) => {
    console.log(params);
    // alert(`Загрузка данных с бэка раздел день страница ${getState().task.current_page_day}`)
    const response = await api.get(`tasks/execute/to_range/?start=${params.now_day && params.now_day + '.' + params.now_month + '.' + params.now_year}&end=${params.now_day && params.now_day + '.'+params.now_month+'.'+params.now_year}${params.search && '&search=' + params.search}${params.visible ? `&position=${getState().employes.employes_current._user.id}&analyst`: ''}`)
    return {response}
  },
)

export const getTaskWeek = createAsyncThunk(
  'task/getTaskWeek',
  async (params:any, {getState}:any) => {
    console.log("this getTaskWeek");
    console.log(params);
    // alert(`Загрузка данных с бэка раздел неделя страница ${getState().task.current_page_week}`)
    const response = await api.get(`tasks/execute/to_range/?start=${params.now_day && params.now_day + '.' + params.now_month + '.' + params.now_year}&end=${params.last_day && params.last_day + '.'+params.last_month+'.'+params.last_year}${params.search && '&search=' + params.search}${params.visible ? `&position=${getState().employes.employes_current._user.id}&analyst`: ''}`)
    return {response}
  },
)

export const getTaskAll = createAsyncThunk(
  'task/getTaskAll',
  async (params:any, {getState}:any) => {
    // alert(`Загрузка данных с бэка раздел все страница ${getState().task.current_page_all} `)
    console.log(params);
    
    let company:any = localStorage.getItem('WT_company')
    
    const response = await api.get(`tasks/execute/?company=${JSON.parse(company).id}${params.search ? `&search=${params.search}` : ''}${params.visible ? `&position=${getState().employes.employes_current._user.id}&analyst`: ''}`)
    return {response}
  },
)

export const getCurrentTask = createAsyncThunk(
  'task/getCurrentTask',
  async (params:{current_task: any, index: number}, {getState}:any) => {
    console.log(params);
    // alert(`Загрузка данных с бэка раздел неделя страница ${getState().task.current_page_week}`)
    const response = await api.get(`tasks/tasks/${params.current_task.id}/`)
    return {response, params}
  },
)

export const finishTask = createAsyncThunk(
  'task/finishTask',
  async (params:any, {getState}:any) => {
    // alert(`Загрузка данных с бэка раздел все страница ${getState().task.current_page_all} `)
    console.log(params);
    const response = await api.post(`tasks/execute/${getState().task.current_task_week.id}/complete/`,{
      time_spent: params.time_spent
    })
    return {response}
  },
)
// create task
export interface createTask {
  name: string;
  norm: number;
  start_before?: any;
  description: string;
  artefact: string;
  start: string;
  end?: any;
  delta_type?: string | null;
  delta?: number | null;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}
export const createTask = createAsyncThunk(
  'task/createTask',
  async (params: createTask, {getState}:any) => {
    // alert(`Загрузка данных с бэка раздел все страница ${getState().task.current_page_all} `)
    console.log(params);
    try {
      const response = await api.post(`tasks/tasks/`,{
        name: params.name,
        norm: params.norm,
        start_before: params.start_before,
        description: params.description,
        artefact: params.artefact,
        start: params.start,
        end: params.end,
        delta_type: params.delta_type,
        delta: params.delta,
        mon: params.mon,
        tue: params.tue,
        wed: params.wed,
        thu: params.thu,
        fri: params.fri,
        sat: params.sat,
        sun: params.sun,
        position: getState().employes.employes_current._user.id,
        company: getState().auth.current_company.id,
      }) 
      return {response}
    } catch (error) {
      console.log(error);
      
    }
  },
)

export const changeTask = createAsyncThunk(
  'task/changeTask',
  async (params: createTask, {getState}:any) => {
    // alert(`Загрузка данных с бэка раздел все страница ${getState().task.current_page_all} `)
    console.log(params);
    try {
      const response = await api.put(`tasks/tasks/${getState().task.current_task_week.id}/`,{
        name: params.name,
        norm: params.norm,
        start_before: params.start_before,
        description: params.description,
        artefact: params.artefact,
        start: params.start,
        end: params.end,
        delta_type: params.delta_type,
        delta: params.delta,
        mon: params.mon,
        tue: params.tue,
        wed: params.wed,
        thu: params.thu,
        fri: params.fri,
        sat: params.sat,
        sun: params.sun,
        position: getState().employes.employes_current._user.id,
        company: getState().auth.current_company.id,
      }) 
      return {response, params}
    } catch (error) {
      console.log(error);
    }
  },
)
// "name": "test task week 1",
// "norm": 15,
// "start_before": null,
// "description": "That is a new test task!",
// "artefact": "https://google.com",
// "start": "26.09.2022",
// "end": null,
// "delta_type": "week",
// "delta": 1,
// "mon": false,
// "tue": false,
// "wed": false,
// "thu": false,
// "fri": true,
// "sat": true,
// "sun": false,
// "position": 1,
// "company": 2,
// "parent_task": 61


const taskSlice = createSlice({
  name: 'task',
  initialState: {
    // loading
    loading: false,
    // for work
    variant_table: [ { id: 1, title: 'Все' }, { id:2 , title: 'Неделя' }, { id: 3, title: 'День' } ],
    current_variant_table: 2,
    // for sidebar
    isVisibleSideBar: false,
    // task for day
    // ? dont work
    get_all_task_day: [],
    current_task_day: {},
    // ? end dont work
    // task for week
    get_all_task_week: [],
    current_task_week: {} as any,
    current_task_index: 0,
    // task for all 
    // ? dont work
    get_all_task_all: [],
    current_task_all: {},
    // ? end dont work
    // for pagination for day
    current_page_day: 1,
    all_pages_day: 1,
    // for pagination for week
    current_page_week: 1,
    all_pages_week: 1,
    // for pagination for all
    current_page_all: 1,
    all_pages_all: 1,
    
    need_load_data: false,
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
    // getCurrentTask(state:TaskState, action:any){
    //   console.log(action.payload);
    //   state.current_task_week = action.payload.current_task 
    //   state.current_task_index = action.payload.index
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskDay.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getTaskDay.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.get_all_task_week = payload.response.data
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
      if(payload.response.status < 300){
        state.get_all_task_week = payload.response.data.results
      }
      state.loading = false
    });
    builder.addCase(getTaskAll.rejected, (state:TaskState) => {
      state.loading = false
    });
    // finishTask
    builder.addCase(finishTask.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(finishTask.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      // state.get_all_task_week = payload.response.data
      if(payload.response.status < 300){
        let current_day_week = moment().toDate().getDay() - 1
        alert(payload.response.data.detail)
        try {
          state.get_all_task_week[state.current_task_index].days[current_day_week] = {...state.get_all_task_week[state.current_task_index].days[current_day_week], status: 'green'} 
        } catch (error) {
          
        }
      }
      else{
        alert(payload.response.data.detail)
      }
      state.isVisibleSideBar = false
      state.loading = false
    });
    builder.addCase(finishTask.rejected, (state:TaskState) => {
      state.loading = false
    });
    // createTask
    builder.addCase(createTask.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(createTask.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status < 300){
        alert('Создание задачи прошло успешно')
        state.isVisibleSideBar = false
        state.need_load_data = !state.need_load_data
      }
      // state.get_all_task_week = payload.response.data
      state.loading = false
    });
    builder.addCase(createTask.rejected, (state:TaskState) => {
      state.loading = false
    });
    // getCurrentTask
    builder.addCase(getCurrentTask.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getCurrentTask.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.current_task_index = payload.params.index
      state.current_task_week = payload.response.data
      state.loading = false
    });
    builder.addCase(getCurrentTask.rejected, (state:TaskState) => {
      state.loading = false
    });
    // changeTask
    // need_load_data
    builder.addCase(changeTask.pending, (state:TaskState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(changeTask.fulfilled, (state:TaskState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.need_load_data = !state.need_load_data
      state.loading = false
    });
    builder.addCase(changeTask.rejected, (state:TaskState) => {
      state.loading = false
    });
  },

  
});

export default taskSlice.reducer;
export const { setCurrentVariantTable, changeVisibleSideBar, changePagesDay, changePagesWeek, changePagesAll } = taskSlice.actions;