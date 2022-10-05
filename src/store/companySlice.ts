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
    alert(`Загрузка данных в разделе должности - Списки всех сотрудников на странице ${getState().company.current_page}`)
  },
)

const companySlice = createSlice({
  name: 'company',
  initialState: {
    loading: false,
    
    // one_company
    listCompany: [
      {
        id: 1,
        name_company: 'ООО Купипродай',
        company_root: [
          "Исполнитель",
          "Контроллёр",
          "Аналитик"
        ]
      },
      {
        id: 2,
        name_company: 'ООО Соберипострой',
        company_root: [
          "Исполнитель",
        ]
      },
      {
        id: 3,
        name_company: 'ООО Принесуподай',
        company_root: [
          "Исполнитель",
          "Контроллёр",
        ]
      },
    ],
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
        
    });
    builder.addCase(getListCompany.rejected, (state:CompanyState) => {
        state.loading = false
    });
  },
});

export default companySlice.reducer;
export const { setCurrentVariantTable, changePagesCompany } = companySlice.actions;