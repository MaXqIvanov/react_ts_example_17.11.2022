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
  async (params: CallableFunction) => {
    const token = Cookies.get('token')
    const response = await api.get(`/users?token=${token}`)
    return {response, params}
  },
)

export const userAuth = createAsyncThunk(
    'auth/userRegistration',
    async (params:{email: string, password: string, nav: CallableFunction}) => {
      const response = await api(`users?email=${params.email}&password=${params.password}`)
      return {response, params}
    },
  )

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {token: '', id: null, username: '', email: '', password: ''},
    auth: true,
    loading: false,
  },
  reducers: {
    logout(state: AuthState, action: PayloadAction) { 
      state.auth = false
      state.user = {token : '', id: null, username: '', password: '', email: ''}
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state:AuthState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getProfile.fulfilled, (state:AuthState,  { payload }:PayloadAction<any>) => {
        state.loading = false
        if(payload.response.data?.length == 0){
            payload.params('/auth')
        }else {
            state.auth = true
            state.user = payload.response.data[0]
        }
        
    });
    builder.addCase(getProfile.rejected, (state:AuthState) => {
        state.loading = false
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;