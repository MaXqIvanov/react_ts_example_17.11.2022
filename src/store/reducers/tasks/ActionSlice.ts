import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../plugins/axios/api';

export const getTaskDay = createAsyncThunk(
  'task/getTaskDay',
  async (params: any, { getState }: any) => {
    console.log(params);
    const company: any = localStorage.getItem('WT_company');
    const response = await api.get(
      `tasks/execute/to_range/?start=${
        params.now_day && params.now_day + '.' + params.now_month + '.' + params.now_year
      }&company=${JSON.parse(company).id}&end=${
        params.now_day && params.now_day + '.' + params.now_month + '.' + params.now_year
      }${params.search && '&search=' + params.search}${
        params.visible ? `&position=${getState().employes.employes_current._user.id}&analyst` : ''
      }`
    );
    return { response };
  }
);

export const getTaskWeek = createAsyncThunk(
  'task/getTaskWeek',
  async (params: any, { getState }: any) => {
    console.log('this getTaskWeek');
    console.log(params);
    const company: any = localStorage.getItem('WT_company');
    const response = await api.get(
      `tasks/execute/to_range/?start=${
        params.now_day && params.now_day + '.' + params.now_month + '.' + params.now_year
      }&company=${JSON.parse(company).id}&end=${
        params.last_day && params.last_day + '.' + params.last_month + '.' + params.last_year
      }${params.search && '&search=' + params.search}${
        params.visible ? `&position=${getState().employes.employes_current._user.id}&analyst` : ''
      }`
    );
    return { response };
  }
);

export const getTaskAll = createAsyncThunk(
  'task/getTaskAll',
  async (params: any, { getState }: any) => {
    console.log(params);

    const company: any = localStorage.getItem('WT_company');

    const response = await api.get(
      `tasks/execute/?company=${JSON.parse(company).id}${
        params.search ? `&search=${params.search}` : ''
      }${
        params.visible ? `&position=${getState().employes.employes_current._user.id}&analyst` : ''
      }`
    );
    return { response };
  }
);

export const getCurrentTask = createAsyncThunk(
  'task/getCurrentTask',
  async (params: { current_task: any; index: number }, { getState }: any) => {
    console.log(params);
    const response = await api.get(`tasks/tasks/${params.current_task.id}/`);
    return { response, params };
  }
);

export const finishTask = createAsyncThunk(
  'task/finishTask',
  async (params: any, { getState }: any) => {
    console.log(params);
    const response = await api.post(
      `tasks/execute/${getState().task.current_task_week.id}/complete/`,
      {
        time_spent: params.time_spent,
      }
    );
    return { response };
  }
);
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
  async (params: createTask, { getState }: any) => {
    // alert(`Загрузка данных с бэка раздел все страница ${getState().task.current_page_all} `)
    console.log(params);
    try {
      const response = await api.post(`tasks/tasks/`, {
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
      });
      return { response };
    } catch (error) {
      console.log(error);
    }
  }
);

export const changeTask = createAsyncThunk(
  'task/changeTask',
  async (params: createTask, { getState }: any) => {
    console.log(params);
    try {
      const response = await api.put(`tasks/tasks/${getState().task.current_task_week.id}/`, {
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
      });
      return { response, params };
    } catch (error) {
      console.log(error);
    }
  }
);
