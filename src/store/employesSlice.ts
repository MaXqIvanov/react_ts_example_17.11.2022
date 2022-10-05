import { TaskState } from './../ts/anyTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { EmployesState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getEmployesAll = createAsyncThunk(
  'employes/getEmployes',
  async (params: any, {getState}:any) => {
    alert(`Загрузка данных в разделе Сотрудники - Списки всех сотрудников на странице ${getState().employes.current_page}`)
    // return {response, params}
  },
)

    // section_company_employes
  export const getEmployesCompany = createAsyncThunk(
    'employes/getEmployes',
    async (params: any, {getState}:any) => {
      alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
      // return {response, params}
    },
  )

const controlSlice = createSlice({
  name: 'employes',
  initialState: {
    variant_table: [ { id: 1, title: 'Все' }, { id:2 , title: 'Неделя' }, { id: 3, title: 'День' }],
    current_variant_table: 1,
    loading: false,

    // for sidebar
    isVisibleSideBar: false,
    // get_employes_all
    employes_all: [],

    // for pagination
    current_page: 1,
    all_pages: 10,

    // section_company_employes
    current_page_company_employes: 1,
    all_pages_company_employes: 10,

  },
  reducers: {
    setCurrentVariantTable(state:EmployesState, action:any){
        state.current_variant_table = action.payload
    },
    changeVisibleSideBar(state:EmployesState, action:any){
      state.isVisibleSideBar = !state.isVisibleSideBar
    },
    changePages(state:EmployesState, action:any){
      let current_page = state.current_page + action.payload
      if(current_page > 0 && current_page <= state.all_pages){
        state.current_page = current_page
      }
    },

    // section_company_employes
    changePagesCompanyEmployes(state:EmployesState, action:any){
      let current_page_company_employes = state.current_page_company_employes + action.payload
      if(current_page_company_employes > 0 && current_page_company_employes <= state.all_pages_company_employes){
        state.current_page_company_employes = current_page_company_employes
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployesAll.pending, (state:EmployesState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getEmployesAll.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
        
    });
    builder.addCase(getEmployesAll.rejected, (state:EmployesState) => {
        state.loading = false
    });
  },
});

export default controlSlice.reducer;
export const { setCurrentVariantTable, changeVisibleSideBar, changePages, changePagesCompanyEmployes } = controlSlice.actions;