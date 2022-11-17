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
    // alert(`Загрузка данных в разделе Сотрудники - Списки всех сотрудников на странице ${getState().employes.current_page}`)
    let company:any = localStorage.getItem('WT_company')
    const response = await api.get(`companies/employees/?company=${JSON.parse(company).id}`)
    return {response}
  },
)

    // section_company_employes Компания / Должности
    // ?? Компания - пользователи
  export const getEmployesCompany = createAsyncThunk(
    'employes/getEmployesCompany',
    async (params: any, {getState}:any) => {
      let company:any = localStorage.getItem('WT_company')
      // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
      const response = await api.get(`companies/employees/?company=${JSON.parse(company).id}&search=${params.search}`)
      return {response}
    },
  )
  export const createEmployesCompany = createAsyncThunk(
    'employes/createEmployesCompany',
    async (params: any, {getState}:any) => {
      console.log(params);
      let company:any = localStorage.getItem('WT_company')
      params = {...params, 'company': JSON.parse(company).id}
      // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
      const response = await api.post(`companies/employees/`, params)
      return {response, params}
    },
  )
  export const changeEmployesCompany = createAsyncThunk(
    'employes/changeEmployesCompany',
    async (params: any, {getState}:any) => {
      console.log(params);
      let company:any = localStorage.getItem('WT_company')
      params = {...params, 'company': JSON.parse(company).id, 'user': getState().employes.employes_company_current.user}
      // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
      const response = await api.put(`companies/employees/${getState().employes.employes_company_current.id}/`, params)
      return {response, params}
    },
  )
  export const deleteEmployesCompany = createAsyncThunk(
    'employes/deleteEmployesCompany',
    async (params: any, {getState}:any) => {
      console.log(params);
      
      // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_company_employes}`)
      const response = await api.delete(`companies/employees/${getState().employes.employes_company_current.id}/`)
      return {response, params}
    },
  )
  // ?? Администраторы
  // section_admin_employes Компания / Пользователи
  export const getEmployesAdmin = createAsyncThunk(
    'employes/getEmployesAdmin',
    async (params: any, {getState}:any) => {
      // alert(`Загрузка данных в разделе Компании Сотрудники - на странице ${getState().employes.current_page_admin_employes}`)
      const response = await api.get(`accounts/admins/?search=${params.search}`)
      return {response, params}
    },
  )
  export const getEmployesCompanyAdmin = createAsyncThunk(
    'employes/getEmployesCompanyAdmin',
    async (params: any, {getState}:any) => {
      const response = await api.get(`companies/companies`)
      return {response, params}
    },
  )
  // accounts/admins/
  export const createEmployesCompanyAdmin = createAsyncThunk(
    'employes/createEmployesCompanyAdmin',
    async (params: any, {getState}:any) => {
      const response = await api.post(`accounts/admins/`,{
        phone: params.phone,
        name: params.name,
        password: params.password,
        company: params.company,

      })
      return {response, params}
    },
  )
  export const changeEmployesCompanyAdmin = createAsyncThunk(
    'employes/changeEmployesCompanyAdmin',
    async (params: any, {getState}:any) => {
      console.log(params);
      
      const response = await api.put(`accounts/admins/${getState().employes.employes_admin_current.id}/`,params)
      return {response, params}
    },
  )
  export const deleteEmployesCompanyAdmin = createAsyncThunk(
    'employes/deleteEmployesCompanyAdmin',
    async (params: any, {getState}:any) => {
      console.log(params);
      
      const response = await api.delete(`accounts/admins/${getState().employes.employes_admin_current.id}/`)
      return {response, params}
    },
  )

const controlSlice = createSlice({
  name: 'employes',
  initialState: {
    loading: false,

    // for sidebar
    isVisibleSideBar: false,
    isVisibleSideBarCreate: false,
    // get_employes_all
    employes_all: [],
    employes_current: {} as any,
    employes_current_index: 1,
    // for pagination
    current_page: 1,
    all_pages: 10,

    // section_company_employes
    employes_company_all: [],
    employes_company_current: {} as any,
    employes_company_index: 1,
    current_page_company_employes: 1,
    all_pages_company_employes: 10,
    // section_admin_employes
    employes_admin_all: [],
    employes_admin_current: {} as any,
    employes_admin_index: 1,
    position_all_admin: [],
  },
  reducers: {
    setCurrentVariantTable(state:EmployesState, action:any){
    },
    changeVisibleSideBar(state:EmployesState, action:any){
      state.isVisibleSideBar = !state.isVisibleSideBar
    },
    changeVisibleSideBarCreate(state: EmployesState, action: any){
      state.isVisibleSideBarCreate = !state.isVisibleSideBarCreate
    },
    setCurrentEmployes(state:EmployesState, action:any){
      state.employes_current = action.payload.employes_current
      state.employes_company_index = action.payload.index
    },
    changePages(state:EmployesState, action:any){
      let current_page = state.current_page + action.payload
      if(current_page > 0 && current_page <= state.all_pages){
        state.current_page = current_page
      }
    },
    // section_company_employes
    setCurrentEmployesCompany(state:EmployesState, action:any){
      state.employes_company_current = action.payload.employes_current
      state.employes_current_index = action.payload.index
    },

    // section_company_employes
    changePagesCompanyEmployes(state:EmployesState, action:any){
      let current_page_company_employes = state.current_page_company_employes + action.payload
      if(current_page_company_employes > 0 && current_page_company_employes <= state.all_pages_company_employes){
        state.current_page_company_employes = current_page_company_employes
      }
    },

    getCurrentAdmin(state: EmployesState, action: any){
      state.employes_admin_current = action.payload.admin_current
      state.employes_admin_index = action.payload.index
    },
    
    // section_admin_employes
    // changePagesAdminEmployes(state:EmployesState, action:any){
    //   let current_page_admin_employes = state.current_page_admin_employes + action.payload
    //   if(current_page_admin_employes > 0 && current_page_admin_employes <= state.all_pages_admin_employes){
    //     state.current_page_admin_employes = current_page_admin_employes
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployesAll.pending, (state:EmployesState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getEmployesAll.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.employes_all = payload.response.data.results
      state.loading = false
    });
    builder.addCase(getEmployesAll.rejected, (state:EmployesState) => {
        state.loading = false
    });

    builder.addCase(getEmployesCompany.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getEmployesCompany.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.employes_company_all = payload.response.data.results
      state.loading = false
    });
    builder.addCase(getEmployesCompany.rejected, (state:EmployesState) => {
        state.loading = false
    });
    // createEmployesCompany
    builder.addCase(createEmployesCompany.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(createEmployesCompany.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status < 400){
        state.employes_company_all = [...state.employes_company_all, payload.response.data]
        payload.params.setIsAddedSideBar(false)
      }
      state.loading = false
    });
    builder.addCase(createEmployesCompany.rejected, (state:EmployesState) => {
        state.loading = false
    });
    // changeEmployesCompany
    builder.addCase(changeEmployesCompany.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(changeEmployesCompany.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status < 400){
        state.employes_company_all[state.employes_company_index] = payload.response.data
        payload.params.setIsVisibleSideBar(false)
      }
      state.loading = false
    });
    builder.addCase(changeEmployesCompany.rejected, (state:EmployesState) => {
        state.loading = false
    });
    // deleteEmployesCompany
    builder.addCase(deleteEmployesCompany.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(deleteEmployesCompany.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status < 400){
        state.employes_company_all.splice(state.employes_company_index, 1)
        state.employes_company_current = {}
      }
      state.loading = false
    });
    builder.addCase(deleteEmployesCompany.rejected, (state:EmployesState) => {
        state.loading = false
    });

    builder.addCase(getEmployesAdmin.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getEmployesAdmin.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload)
      state.employes_admin_all = payload.response.data.results
      state.loading = false
    });
    builder.addCase(getEmployesAdmin.rejected, (state:EmployesState) => {
        state.loading = false
    });
    // getEmployesCompanyAdmin
    builder.addCase(getEmployesCompanyAdmin.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(getEmployesCompanyAdmin.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.position_all_admin = payload.response.data.results ? payload.response.data.results : payload.response.data
      state.loading = false
    });
    builder.addCase(getEmployesCompanyAdmin.rejected, (state:EmployesState) => {
        state.loading = false
    });
// createEmployesCompanyAdmin
    builder.addCase(createEmployesCompanyAdmin.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(createEmployesCompanyAdmin.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      if(payload.response.status >= 400){
        alert(payload.response.data.phone ? payload.response.data.phone[0] : 'Создать администратора не получилось')
      }else{
        state.employes_admin_all = [...state.employes_admin_all, payload.response.data]
        state.loading = false
        payload.params.setIsAddedSideBar(false)
      }
    });
    builder.addCase(createEmployesCompanyAdmin.rejected, (state:EmployesState) => {
        state.loading = false
    });
    // changeEmployesCompanyAdmin
    builder.addCase(changeEmployesCompanyAdmin.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(changeEmployesCompanyAdmin.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.employes_admin_all[state.employes_admin_index] = payload.response.data
      state.loading = false
      payload.params.setIsVisibleSideBar(false)
    });
    builder.addCase(changeEmployesCompanyAdmin.rejected, (state:EmployesState) => {
        state.loading = false
    });
    // deleteEmployesCompanyAdmin
    builder.addCase(deleteEmployesCompanyAdmin.pending, (state:EmployesState, action:PayloadAction) => {
      state.loading = true
    });
    builder.addCase(deleteEmployesCompanyAdmin.fulfilled, (state:EmployesState,  { payload }:PayloadAction<any>) => {
      console.log(payload);
      state.employes_admin_all.splice(state.employes_admin_index, 1)
      state.employes_admin_current = {}
      state.loading = false
    });
    builder.addCase(deleteEmployesCompanyAdmin.rejected, (state:EmployesState) => {
        state.loading = false
    });
  },
});

export default controlSlice.reducer;
export const { setCurrentVariantTable, setCurrentEmployesCompany, changeVisibleSideBar, getCurrentAdmin, changePages, changePagesCompanyEmployes, setCurrentEmployes, changeVisibleSideBarCreate } = controlSlice.actions;