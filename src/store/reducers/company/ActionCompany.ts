import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../plugins/axios/api';
import { RootState } from '../../store';

export const getCompanyEmployes = createAsyncThunk(
  'company/getCompanyEmployes',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    const response = await api.get(`accounts/admins/?page_size=999999`);
    return { response };
  }
);

export const getCompanyAdmin = createAsyncThunk(
  'company/getCompanyAdmin',
  async (params: { search: string }) => {
    const response = await api.get(`companies/companies/?search=${params.search}&page_size=999999`);
    return { response, params };
  }
);
interface IParamsCompanyAdmin {
  name: string;
  admin: number;
  setIsModalWindowAdded: React.Dispatch<React.SetStateAction<boolean>>;
}
export const createCompanyAdmin = createAsyncThunk(
  'company/createCompanyAdmin',
  async (params: IParamsCompanyAdmin) => {
    const response = await api.post(`companies/companies/`, params);
    return { response, params };
  }
);
export const changeCompanyAdmin = createAsyncThunk(
  'company/changeCompanyAdmin',
  async (params: IParamsCompanyAdmin, { getState }) => {
    const rootState = getState() as RootState;
    const response = await api.put(
      `companies/companies/${rootState.company.company_admin_current.id}/`,
      params
    );
    return { response, params };
  }
);
export const deleteCompanyAdmin = createAsyncThunk(
  'company/deleteCompanyAdmin',
  async (_, { getState }) => {
    const rootState = getState() as RootState;
    const response = await api.delete(
      `companies/companies/${rootState.company.company_admin_current.id}/`
    );
    return { response };
  }
);
