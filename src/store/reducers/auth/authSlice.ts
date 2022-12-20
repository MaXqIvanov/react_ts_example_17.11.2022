import { ICompany, IUser, TAuthState } from './../../../ts/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { getProfile, userAuth } from './ActionAuth';
import { NavigateFunction } from 'react-router-dom';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    first_render: true as boolean,
    user: {
      is_staff: false,
      is_admin: true,
      is_analyst: false,
      is_controller: false,
      is_executor: false,
    } as IUser,
    user_company: [] as ICompany[],
    current_company: {} as ICompany,
    auth: true as boolean,
    loading: true as boolean,
  },
  reducers: {
    logout(state: TAuthState, action: PayloadAction<CallableFunction>) {
      state.auth = false;
      state.user = {} as IUser;
      Cookies.remove('token');
      action.payload('/auth');
    },
    changeCurrentCompany(
      state: TAuthState,
      action: PayloadAction<{ elem: ICompany; setIsVisibleLabel: CallableFunction }>
    ) {
      const promise = new Promise((res: any, rej: any) => {
        localStorage.setItem('WT_company', JSON.stringify(action.payload.elem));
        state.current_company = action.payload.elem;
        res('');
      });
      promise.then(() => action.payload.setIsVisibleLabel(false));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state: TAuthState, action: PayloadAction) => {
      if (state.first_render) {
        state.loading = true;
      }
    });
    builder.addCase(
      getProfile.fulfilled,
      (
        state: TAuthState,
        {
          payload,
        }: PayloadAction<{
          id_company: ICompany;
          response: { status: number; data: IUser };
          response2: { data: ICompany[] };
          params: { nav: NavigateFunction };
        }>
      ) => {
        console.log(payload);
        state.loading = false;
        if (payload.response.status >= 400) {
          payload.params.nav('/auth');
        } else if (payload.response.status < 300) {
          state.first_render = false;
          state.auth = true;
          state.user = payload.response.data;
          if (payload?.response2?.data) {
            state.user_company = payload.response2.data;
          }
          if (payload.id_company) {
            state.current_company = payload.id_company;
          } else {
            state.current_company = payload.response2.data[0];
          }
        }
      }
    );
    builder.addCase(getProfile.rejected, (state: TAuthState) => {
      state.loading = false;
    });
    builder.addCase(
      userAuth.fulfilled,
      (
        state: TAuthState,
        {
          payload,
        }: PayloadAction<{
          response: { status: number; data: { user: IUser; token: string; detail: string } };
          params: { nav: CallableFunction };
        }>
      ) => {
        console.log(payload);
        if (payload.response.status > 300) {
          alert(payload.response.data.detail);
        } else if (payload.response.status < 300) {
          Cookies.set('token', payload.response.data.token, { expires: 90 });
          Cookies.set('user', JSON.stringify(payload.response.data.user), { expires: 90 });
          api.defaults.headers = {
            Authorization: `Bearer ${payload.response.data.token}`,
          } as CommonHeaderProperties;
          state.auth = true;
          state.user = payload.response.data.user;
          payload.params.nav('/');
        }
      }
    );
  },
});

export default authSlice.reducer;
export const { logout, changeCurrentCompany } = authSlice.actions;
