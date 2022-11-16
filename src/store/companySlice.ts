import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import { HeadersDefaults } from 'axios';
import { CompanyState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getListCompany = createAsyncThunk(
  'company/getListCompany',
  async (params: any, {getState}:any) => {
    const response = await api.get(`v1/images/search`)
    return response
  },
)

export const getCompanyAll = createAsyncThunk(
  'company/getCompanyAll',
  async (params: any, {getState}:any) => {
    // alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().company.current_page}`)
    const response = await api.get(`v1/images/search`)
    return response
  },
)

const companySlice = createSlice({
  name: 'company',
  initialState: {
    loading: false,
    company_admin_all: [],
    company_admin_current: {} as any,
    company_admin_index: 1,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getListCompany.pending, (state:CompanyState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getListCompany.fulfilled, (state:CompanyState,  { payload }:PayloadAction<any>) => {
      state.loading = false
    });
    builder.addCase(getListCompany.rejected, (state:CompanyState) => {
      state.loading = false
    });

    builder.addCase(getCompanyAll.pending, (state:CompanyState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getCompanyAll.fulfilled, (state:CompanyState,  { payload }:PayloadAction<any>) => {

      state.loading = false
    });
    builder.addCase(getCompanyAll.rejected, (state:CompanyState) => {
      state.loading = false
    });
  },
});

export default companySlice.reducer;
export const { setCurrentVariantTable, changePagesCompany } = companySlice.actions;