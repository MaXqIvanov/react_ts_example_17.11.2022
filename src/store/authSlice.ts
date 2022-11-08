import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { AuthState } from '../ts/anyTypes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (params: any, {getState}:any) => {
    let current_company:any = localStorage.getItem('WT_company')
    current_company = JSON.parse(current_company)
    console.log(current_company);
    let response2:any;
    if(getState().auth.first_render){
      response2 = await api.get(`accounts/companies/`)
    }
    
    const response = await api.get(`accounts/profile/?company=${current_company ? current_company.id : response2?.data[0]?.id}`)
    if(!current_company && response2.data.length > 0){
      localStorage.setItem('WT_company', JSON.stringify(response2.data[0]))
    }
    return {response, params, response2, id_company: current_company}
  },
)
export const userAuth = createAsyncThunk(
    'auth/userAuth',
    async (params:{login: string, password: string, nav: CallableFunction}) => {
      const response = await api.post(`accounts/auth/`,{
        login: params.login,
        password: params.password,
      })
      return {response, params}
    },
  )

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    first_render: true,
    user: {} as any,
    user_company: [],
    current_company: {} as any,
    auth: false as boolean,
    loading: true as boolean,
  },
  reducers: {
    logout(state: AuthState, action: PayloadAction<any>) { 
      state.auth = false
      state.user = {}
      Cookies.remove('token');
      console.log(action);
      action.payload('/auth')
    },
    changeCurrentCompany(state: AuthState, action: PayloadAction<any>){
      let promise = new Promise((res:any, rej:any)=> {
        localStorage.setItem('WT_company', JSON.stringify(action.payload.elem))
        state.current_company = action.payload.elem
        res('')
      })
      promise.then(()=> action.payload.setIsVisibleLabel(false))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state:AuthState, action:PayloadAction) => {
      if(state.first_render){
        state.loading = true
      }
    });
    builder.addCase(getProfile.fulfilled, (state:AuthState,  { payload }:PayloadAction<any>) => {
        console.log(payload);
        state.loading = false
        state.first_render = false
        if(payload.response.status >= 400){
            payload.params.nav('/auth')
        }else if(payload.response.status < 300) {
            state.auth = true
            state.user = payload.response.data
            state.user_company = payload.response2.data
            if(payload.id_company){
              state.current_company = payload.id_company
            }else{
              state.current_company = payload.response2.data[0]
            }
        }
    });
    builder.addCase(getProfile.rejected, (state:AuthState) => {
        state.loading = false
    });
    // 
    builder.addCase(userAuth.pending, (state:AuthState, action:PayloadAction) => {
    });
    builder.addCase(userAuth.fulfilled, (state:AuthState,  { payload }:PayloadAction<any>) => {
        console.log(payload);
        if(payload.response.status > 300){
            alert(payload.response.data.detail)
        }else if(payload.response.status < 300){
            Cookies.set('token', payload.response.data.token)
            Cookies.set('user', JSON.stringify(payload.response.data.user))
            state.auth = true
            state.user = payload.response.data
            payload.params.nav('/')
        }
    });
    builder.addCase(userAuth.rejected, (state:AuthState) => {
    });
  },
});

export default authSlice.reducer;
export const { logout, changeCurrentCompany } = authSlice.actions;