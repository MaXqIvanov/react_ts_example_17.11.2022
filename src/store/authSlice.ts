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
  async (params: any) => {
    let current_company = localStorage.getItem('WT_company')

    const response = await api.get(`accounts/profile/?company=${current_company}`)
    return {response, params}
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
    user: {} as any,
    auth: false,
    loading: true,
  },
  reducers: {
    logout(state: AuthState, action: PayloadAction<any>) { 
      state.auth = false
      state.user = {}
      Cookies.remove('token');
      console.log(action);
      action.payload('/auth')
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state:AuthState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getProfile.fulfilled, (state:AuthState,  { payload }:PayloadAction<any>) => {
        console.log(payload);
        state.loading = false
        if(payload.response.status >= 400){
            payload.params.nav('/auth')
        }else if(payload.response.status < 300) {
            state.auth = true
            state.user = payload.response.data
        }
    });
    builder.addCase(getProfile.rejected, (state:AuthState) => {
        state.loading = false
    });
    // 
    builder.addCase(userAuth.pending, (state:AuthState, action:PayloadAction) => {
      // state.loading = true
    });
    builder.addCase(userAuth.fulfilled, (state:AuthState,  { payload }:PayloadAction<any>) => {
        console.log(payload);
        // state.loading = false
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
        // state.loading = false
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;