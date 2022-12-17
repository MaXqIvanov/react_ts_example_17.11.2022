import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/axios/api";

export const getCompanyEmployes = createAsyncThunk(
    'company/getCompanyEmployes',
    async (_, { getState }: any) => {
      const response = await api.get(`accounts/admins/?page_size=999999`);
      return { response };
    }
  );
  
  export const getCompanyAdmin = createAsyncThunk(
    'company/getCompanyAdmin',
    async (params: any, { getState }: any) => {
      const response = await api.get(`companies/companies/?search=${params.search}&page_size=999999`);
      return { response, params };
    }
  );
  export const createCompanyAdmin = createAsyncThunk(
    'company/createCompanyAdmin',
    async (params: any, { getState }: any) => {
      const response = await api.post(`companies/companies/`, params);
      return { response, params };
    }
  );
  export const changeCompanyAdmin = createAsyncThunk(
    'company/changeCompanyAdmin',
    async (params: any, { getState }: any) => {
      const response = await api.put(
        `companies/companies/${getState().company.company_admin_current.id}/`,
        params
      );
      return { response, params };
    }
  );
  export const deleteCompanyAdmin = createAsyncThunk(
    'company/deleteCompanyAdmin',
    async (params: any, { getState }: any) => {
      const response = await api.delete(
        `companies/companies/${getState().company.company_admin_current.id}/`
      );
      return { response, params };
    }
  );