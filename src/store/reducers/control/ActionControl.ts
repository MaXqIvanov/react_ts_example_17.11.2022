import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import api from '../../../plugins/axios/api';

export const getControlTaskAll = createAsyncThunk(
  'control/getControlTaskAll',
  async (params: any, { getState }: any) => {
    // alert(`Загрузка задач в разделе контроль страница ${getState().control.current_page}`)
    const current_month = moment().toDate().getMonth() + 1;
    const current_day = moment().toDate().getDate();
    const current_year = moment().toDate().getFullYear();
    const company: any = localStorage.getItem('WT_company');

    const response = await api.get(
      `tasks/reports/?is_approve=${params.is_approve}${
        getState().control.position_current.id
          ? '&task_position=' + getState().control.position_current.id
          : ''
      }&task__company=${
        JSON.parse(company).id
      }&date=${current_day}.${current_month}.${current_year}`
    );
    return { response };
  }
);
export const getPosition = createAsyncThunk(
  'control/getPosition',
  async (params: any, { getState }: any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
    const company: any = localStorage.getItem('WT_company');
    const response = await api.get(`companies/companies/positions_list/${JSON.parse(company).id}`);
    return { response };
  }
);
// tasks/reports/10/approve/
export const taskApprove = createAsyncThunk(
  'control/taskApprove',
  async (params: any, { getState }: any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
    const response = await api.post(
      `tasks/reports/${getState().control.controls_task_current.id}/approve/`
    );
    return { response, params };
  }
);
// tasks/reports/{{report_id}}/reject/
export const taskReject = createAsyncThunk(
  'control/taskReject',
  async (params: any, { getState }: any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
    const response = await api.post(
      `tasks/reports/${getState().control.controls_task_current.id}/reject/`
    );
    return { response, params };
  }
);
