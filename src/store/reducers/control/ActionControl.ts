import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import api from '../../../plugins/axios/api';
import { RootState } from '../../store';

export const getControlTaskAll = createAsyncThunk(
  'control/getControlTaskAll',
  async (params: { is_approve: boolean }, { getState }) => {
    const rootState = getState() as RootState;
    const current_month = moment().toDate().getMonth() + 1;
    const current_day = moment().toDate().getDate();
    const current_year = moment().toDate().getFullYear();
    const company: string = localStorage.getItem('WT_company') as string;

    const response = await api.get(
      `tasks/reports/?is_approve=${params.is_approve}${
        rootState.control.position_current.id
          ? '&task_position=' + rootState.control.position_current.id
          : ''
      }&task__company=${
        JSON.parse(company).id
      }&date=${current_day}.${current_month}.${current_year}`
    );
    return { response };
  }
);
export const getPosition = createAsyncThunk('control/getPosition', async (_, { getState }) => {
  const rootState = getState() as RootState;
  const company: string = localStorage.getItem('WT_company') as string;
  const response = await api.get(`companies/companies/positions_list/${JSON.parse(company).id}`);
  return { response };
});
export const taskApprove = createAsyncThunk('control/taskApprove', async (_, { getState }) => {
  const rootState = getState() as RootState;
  const response = await api.post(
    `tasks/reports/${rootState.control.controls_task_current.id}/approve/`
  );
  return { response };
});
export const taskReject = createAsyncThunk('control/taskReject', async (_, { getState }) => {
  const rootState = getState() as RootState;
  const response = await api.post(
    `tasks/reports/${rootState.control.controls_task_current.id}/reject/`
  );
  return { response };
});
