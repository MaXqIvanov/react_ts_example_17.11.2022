import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../plugins/axios/api";

export const getPosition = createAsyncThunk(
    'position/getPosition',
    async (params: any, { getState }: any) => {
      // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
      const company: any = localStorage.getItem('WT_company');
      const response = await api.get(`companies/companies/positions_list/${JSON.parse(company).id}`);
      return { response };
    }
  );
  
  // companies/positions/
  export const getPositionCompanyAll = createAsyncThunk(
    'position/getPositionCompanyAll',
    async (params: any, { getState }: any) => {
      // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().position.current_page}`)
      const response = await api.get(`companies/positions/?search=${params.search}`);
      return { response, params };
    }
  );
  export const createPosition = createAsyncThunk(
    'position/createPosition',
    async (params: any, { getState }: any) => {
      const company: any = localStorage.getItem('WT_company');
      params = { ...params, company: JSON.parse(company).id };
      const response = await api.post(`companies/positions/`, params);
      return { response, params };
    }
  );
  export const changePosition = createAsyncThunk(
    'position/changePosition',
    async (params: any, { getState }: any) => {
      const response = await api.put(
        `companies/positions/${getState().position.position_company_current.id}/`,
        params
      );
      return { response, params };
    }
  );
  export const deletePosition = createAsyncThunk(
    'position/deletePosition',
    async (params: any, { getState }: any) => {
      const response = await api.delete(
        `companies/positions/${getState().position.position_company_current.id}/`
      );
      return { response, params };
    }
  );