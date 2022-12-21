import { ICompany, IPosition, IUser } from './../../../ts/storeTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../plugins/axios/api';
import { RootState } from '../../store';

interface IParamsActionCompany {
  phone: string;
  name: string;
  password: string;
  position: number;
  is_active: boolean;
  is_executor: boolean;
  is_controller: boolean;
  is_analyst: boolean;
  avatar: string | undefined;
  setIsVisibleSideBar: CallableFunction;
  company?: ICompany;
  user?: IUser;
  current_position?: IPosition | {};
}

export const getEmployesAll = createAsyncThunk('employes/getEmployes', async (_, { getState }) => {
  const rootState = getState() as RootState;
  const company: any = localStorage.getItem('WT_company');
  const response = await api.get(`companies/employees/?company=${JSON.parse(company).id}`);
  return { response };
});

// ?? Компания - пользователи
export const getEmployesCompany = createAsyncThunk(
  'employes/getEmployesCompany',
  async (params: { search: string }) => {
    const company: string = localStorage.getItem('WT_company') as string;
    const response = await api.get(
      `companies/employees/?company=${JSON.parse(company).id}&search=${params.search}`
    );
    return { response };
  }
);
export const createEmployesCompany = createAsyncThunk(
  'employes/createEmployesCompany',
  async (params: IParamsActionCompany) => {
    const company: string = localStorage.getItem('WT_company') as string;
    params = { ...params, company: JSON.parse(company).id };
    const response = await api.post(`companies/employees/`, params);
    return { response, params };
  }
);
export const changeEmployesCompany = createAsyncThunk(
  'employes/changeEmployesCompany',
  async (params: IParamsActionCompany, { getState }) => {
    const rootState = getState() as RootState;
    const company: string = localStorage.getItem('WT_company') as string;
    params = {
      ...params,
      company: JSON.parse(company).id,
      user: rootState.employes.employes_company_current.user,
    };
    const response = await api.put(
      `companies/employees/${rootState.employes.employes_company_current.id}/`,
      params
    );
    return { response, params };
  }
);
export const deleteEmployesCompany = createAsyncThunk(
  'employes/deleteEmployesCompany',
  async (params: IParamsActionCompany, { getState }) => {
    const rootState = getState() as RootState;
    const response = await api.delete(
      `companies/employees/${rootState.employes.employes_company_current.id}/`
    );
    return { response, params };
  }
);
export const getEmployesAdmin = createAsyncThunk(
  'employes/getEmployesAdmin',
  async (params: { search: string }) => {
    const response = await api.get(`accounts/admins/?search=${params.search}`);
    return { response, params };
  }
);
export const getEmployesCompanyAdmin = createAsyncThunk(
  'employes/getEmployesCompanyAdmin',
  async (params: IParamsActionCompany) => {
    const response = await api.get(`companies/companies`);
    return { response, params };
  }
);
// accounts/admins/
export const createEmployesCompanyAdmin = createAsyncThunk(
  'employes/createEmployesCompanyAdmin',
  async (params: IParamsActionCompany) => {
    const response = await api.post(`accounts/admins/`, {
      phone: params.phone,
      name: params.name,
      password: params.password,
      company: params.company,
    });
    return { response, params };
  }
);
export const changeEmployesCompanyAdmin = createAsyncThunk(
  'employes/changeEmployesCompanyAdmin',
  async (params: IParamsActionCompany, { getState }) => {
    const rootState = getState() as RootState;
    const response = await api.put(
      `accounts/admins/${rootState.employes.employes_admin_current.id}/`,
      params
    );
    return { response, params };
  }
);
export const deleteEmployesCompanyAdmin = createAsyncThunk(
  'employes/deleteEmployesCompanyAdmin',
  async (params: IParamsActionCompany, { getState }) => {
    const rootState = getState() as RootState;
    const response = await api.delete(
      `accounts/admins/${rootState.employes.employes_admin_current.id}/`
    );
    return { response, params };
  }
);
