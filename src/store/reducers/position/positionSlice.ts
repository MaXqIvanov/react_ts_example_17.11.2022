import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';
import { PositionState } from '../../../ts/storeTypes';
import {
  changePosition,
  createPosition,
  deletePosition,
  getPosition,
  getPositionCompanyAll,
} from './ActionPosition';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const controlSlice = createSlice({
  name: 'position',
  initialState: {
    loading: false,

    position_all: [],
    position_current: {},
    // company section
    position_company_all: [],
    position_company_current: {} as any,
    position_company_index: 1,
    // for sidebar
    isVisibleSideBar: false,
    // for pagination
    current_page: 1,
    all_pages: 10,
  },
  reducers: {
    changeVisibleSideBar(state: PositionState) {
      state.isVisibleSideBar = !state.isVisibleSideBar;
    },
    changePages(state: PositionState, action: any) {
      const current_page = state.current_page + action.payload;
      if (current_page > 0 && current_page <= state.all_pages) {
        state.current_page = current_page;
      }
    },
    getCurrentPosition(state: PositionState, action: any) {
      state.position_current = action.current;
    },
    getCurrentPositionCompany(state: PositionState, action: any) {
      state.position_company_current = action.payload.current_position_company;
      state.position_company_index = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosition.pending, (state: PositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getPosition.fulfilled,
      (state: PositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.position_all = payload.response.data;
        state.loading = false;
      }
    );
    builder.addCase(getPosition.rejected, (state: PositionState) => {
      state.loading = false;
    });
    // getPositionCompanyAll
    builder.addCase(
      getPositionCompanyAll.pending,
      (state: PositionState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getPositionCompanyAll.fulfilled,
      (state: PositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.position_company_all = payload.response.data.results;
        state.loading = false;
      }
    );
    builder.addCase(getPositionCompanyAll.rejected, (state: PositionState) => {
      state.loading = false;
    });
    // createPosition
    builder.addCase(createPosition.pending, (state: PositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      createPosition.fulfilled,
      (state: PositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.position_company_all = [...state.position_company_all, payload.response.data];
          payload.params.setIsAddedSideBar(false);
        }
        state.loading = false;
      }
    );
    builder.addCase(createPosition.rejected, (state: PositionState) => {
      state.loading = false;
    });
    // changePosition
    builder.addCase(changePosition.pending, (state: PositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      changePosition.fulfilled,
      (state: PositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.position_company_all[state.position_company_index] = payload.response.data;
          payload.params.setIsVisibleSideBar(false);
        }

        state.loading = false;
      }
    );
    builder.addCase(changePosition.rejected, (state: PositionState) => {
      state.loading = false;
    });
    // deletePosition
    builder.addCase(deletePosition.pending, (state: PositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      deletePosition.fulfilled,
      (state: PositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.position_company_all.splice(state.position_company_index, 1);
          state.position_company_current = {};
        }
        state.loading = false;
      }
    );
    builder.addCase(deletePosition.rejected, (state: PositionState) => {
      state.loading = false;
    });
  },
});

export default controlSlice.reducer;
export const { changeVisibleSideBar, changePages, getCurrentPosition, getCurrentPositionCompany } =
  controlSlice.actions;
