import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import { HeadersDefaults } from 'axios';
import { CompanyState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getCompanyEmployes = createAsyncThunk(
  'company/getCompanyEmployes',
  async (params: any, {getState}:any) => {
    const response = await api.get(`accounts/admins/`)
    return {response}
  },
)

export const getCompanyAdmin = createAsyncThunk(
  'company/getCompanyAdmin',
  async (params: any, {getState}:any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().company.current_page}`)
    const response = await api.get(`companies/companies/?search=${params.search}`)
    return {response, params}
  },
)
export const createCompanyAdmin = createAsyncThunk(
  'company/createCompanyAdmin',
  async (params: any, {getState}:any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().company.current_page}`)
    const response = await api.post(`companies/companies/`, params)
    return {response, params}
  },
)

const companySlice = createSlice({
  name: 'company',
  initialState: {
    loading: false,
    company_admin_all: [],
    company_admin_current: {} as any,
    company_admin_index: 1,
    company_employes: [],
    // one_company user
    // for admin_company
    // for pagination
    current_page: 1,
    all_pages: 10,

  },
  reducers: {
    setCurrentVariantTable(state:CompanyState, action:any){
    },
    changePagesCompany(state:CompanyState, action:any){
      let current_page = state.current_page + action.payload
      if(current_page > 0 && current_page <= state.all_pages){
        state.current_page = current_page
      }
    },
    setCurrentCompany(state:CompanyState, action:{payload:{company_current: Object, index: number}}){
      state.company_admin_current = action.payload.company_current
      state.company_admin_index = action.payload.index
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyEmployes.pending, (state:CompanyState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getCompanyEmployes.fulfilled, (state:CompanyState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      
      state.company_employes = payload.response.data.results
      state.loading = false
    });
    builder.addCase(getCompanyEmployes.rejected, (state:CompanyState) => {
      state.loading = false
    });

    builder.addCase(getCompanyAdmin.pending, (state:CompanyState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getCompanyAdmin.fulfilled, (state:CompanyState,  { payload }:PayloadAction<any>) => {
      state.company_admin_all = payload.response.data.results
      state.loading = false
    });
    builder.addCase(getCompanyAdmin.rejected, (state:CompanyState) => {
      state.loading = false
    });
    // createCompanyAdmin
    builder.addCase(createCompanyAdmin.pending, (state:CompanyState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(createCompanyAdmin.fulfilled, (state:CompanyState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status < 400){
        state.company_admin_all = [...state.company_admin_all, payload.response.data] 
      }
      state.loading = false
    });
    builder.addCase(createCompanyAdmin.rejected, (state:CompanyState) => {
      state.loading = false
    });
  },
});

export default companySlice.reducer;
export const { setCurrentVariantTable, changePagesCompany, setCurrentCompany } = companySlice.actions;