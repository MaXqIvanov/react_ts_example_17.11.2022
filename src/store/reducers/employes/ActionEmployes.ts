import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../plugins/axios/api';

export const getEmployesAll = createAsyncThunk(
  'employes/getEmployes',
  async (params: any, { getState }: any) => {
    // alert(`Загрузка данных в разделе Сотрудники - Списки всех сотрудников на странице ${getState().employes.current_page}`)
    const company: any = localStorage.getItem('WT_company');
    const response = await api.get(`companies/employees/?company=${JSON.parse(company).id}`);
    return { response };
  }
);

// section_company_employes Компания / Должности
// ?? Компания - пользователи
export const getEmployesCompany = createAsyncThunk(
  'employes/getEmployesCompany',
  async (params: any, { getState }: any) => {
    const company: any = localStorage.getItem('WT_company');
    // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
    const response = await api.get(
      `companies/employees/?company=${JSON.parse(company).id}&search=${params.search}`
    );
    return { response };
  }
);
export const createEmployesCompany = createAsyncThunk(
  'employes/createEmployesCompany',
  async (params: any, { getState }: any) => {
    console.log(params);
    const company: any = localStorage.getItem('WT_company');
    params = { ...params, company: JSON.parse(company).id };
    // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
    const response = await api.post(`companies/employees/`, params);
    return { response, params };
  }
);
export const changeEmployesCompany = createAsyncThunk(
  'employes/changeEmployesCompany',
  async (params: any, { getState }: any) => {
    console.log(params);
    const company: any = localStorage.getItem('WT_company');
    params = {
      ...params,
      company: JSON.parse(company).id,
      user: getState().employes.employes_company_current.user,
    };
    // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
    const response = await api.put(
      `companies/employees/${getState().employes.employes_company_current.id}/`,
      params
    );
    return { response, params };
  }
);
export const deleteEmployesCompany = createAsyncThunk(
  'employes/deleteEmployesCompany',
  async (params: any, { getState }: any) => {
    console.log(params);

    // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
    const response = await api.delete(
      `companies/employees/${getState().employes.employes_company_current.id}/`
    );
    return { response, params };
  }
);
// ?? Администраторы
// section_admin_employes Компания / Пользователи
export const getEmployesAdmin = createAsyncThunk(
  'employes/getEmployesAdmin',
  async (params: any, { getState }: any) => {
    // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_admin_employes}`)
    const response = await api.get(`accounts/admins/?search=${params.search}`);
    return { response, params };
  }
);
export const getEmployesCompanyAdmin = createAsyncThunk(
  'employes/getEmployesCompanyAdmin',
  async (params: any, { getState }: any) => {
    const response = await api.get(`companies/companies`);
    return { response, params };
  }
);
// accounts/admins/
export const createEmployesCompanyAdmin = createAsyncThunk(
  'employes/createEmployesCompanyAdmin',
  async (params: any, { getState }: any) => {
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
  async (params: any, { getState }: any) => {
    console.log(params);

    const response = await api.put(
      `accounts/admins/${getState().employes.employes_admin_current.id}/`,
      params
    );
    return { response, params };
  }
);
export const deleteEmployesCompanyAdmin = createAsyncThunk(
  'employes/deleteEmployesCompanyAdmin',
  async (params: any, { getState }: any) => {
    console.log(params);

    const response = await api.delete(
      `accounts/admins/${getState().employes.employes_admin_current.id}/`
    );
    return { response, params };
  }
);
