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
    user: {token: '', id: null, username: '', email: '', password: '', profile_img: 'https://s3-alpha-sig.figma.com/img/4234/be2b/c2c8992b81f8685935c0441a326a6b93?Expires=1665360000&Signature=f4Co~v3Bk1-WrftyugVR0EwRnTL7MiPpdQ9CnyG1lyea2mpYvh8lhdk7wvnNvXCU3yKreyVKZbD8ZVCMCI0djCig~IS6XnileUzU4Y3ICX6y3MWlNad0sv1EwpDc0C7UstWTr7y9k8CR-WgTm6Qg8mV3DLPun~uk31gveoZxBnpvc7IU0ZXxt4IbUhAGsb0~-AMGEU0HHSHswcSJf11qdROelaE-vqilNrg4~dg41LTmu-1X~YPLYh33by4mrpqvvMLRiUHCWewp9vybcCIQQN~408LH8sR6TetpENKFDY8fo4SGIYTyCwEzIBOs-CUsqZXorWLMHQh4Xiz~ZtnOcA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'},
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