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
    const token = Cookies.get('token')
    // const response = await api.get(`/users?token=${token}`)
    // return {response, params}
    const response = await api.get(`v1/images/search`)
    return {response}
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
    user: {token: '', id: null, username: '', email: '', password: '', profile_img: 'https://s3-alpha-sig.figma.com/img/4234/be2b/c2c8992b81f8685935c0441a326a6b93?Expires=1666569600&Signature=JYp-hhrTznzfi8wBz8bAwmvkFnAPiVH5TK6301ZbO2Sh56XcXKnTu4S7mryMbVXem895~Zk-2OZMVucp-4oJHkMk4vTpPC0eqzueRFW8U3cs4W5hJCHhgEfu3LYevDKj2-CR77T65XeLOhZzgzcCDh1~RVSFVGKYGshTcQ0kkmnqBG0zBR7R3FZ278R85jHIw-~CsAJbtnLXWDUmyz-x4xieUA7bE~DQZFxRH79z3YdAO4OTb5kCRjgetEP8v9fQ56G9RVSjnZAN459CeHaNtW828hH11nnhVdYCcmsoBhDv~Of8FMDBq-kVY5DX2WJSyazSJWnH-MWQd~MBL5q5uA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'},
    auth: true,
    loading: true,
  },
  reducers: {
    logout(state: AuthState, action: PayloadAction<any>) { 
      state.auth = false
      state.user = {token : '', id: null, username: '', password: '', email: ''}
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
        state.loading = false
        // if(payload.response.data?.length == 0){
        //     payload.params('/auth')
        // }else {
        //     state.auth = true
        //     state.user = payload.response.data[0]
        // }
    });
    builder.addCase(getProfile.rejected, (state:AuthState) => {
        state.loading = false
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;