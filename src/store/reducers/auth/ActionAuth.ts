import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/axios/api";

export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (params: any, { getState }: any) => {
      let current_company: any = localStorage.getItem('WT_company');
      current_company = JSON.parse(current_company);
      console.log(current_company);
      if (!current_company?.id) {
        localStorage.removeItem('WT_company');
      }
      let response2: any;
      if (getState().auth.first_render) {
        response2 = await api.get(`accounts/companies/`);
      }
  
      const response = await api.get(
        `accounts/profile/?company=${current_company ? current_company.id : response2?.data[0]?.id}`
      );
      if (!current_company && response2.data.length > 0) {
        localStorage.setItem('WT_company', JSON.stringify(response2.data[0]));
      }
      return { response, params, response2, id_company: current_company };
    }
  );
  export const userAuth = createAsyncThunk(
    'auth/userAuth',
    async (params: { login: string; password: string; nav: CallableFunction }) => {
      const response = await api.post(`accounts/auth/`, {
        login: params.login,
        password: params.password,
      });
      return { response, params };
    }
  );