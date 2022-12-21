import { IPosition } from './../../../ts/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import { IPositionState } from '../../../ts/storeTypes';
import {
  changePosition,
  createPosition,
  deletePosition,
  getPosition,
  getPositionCompanyAll,
} from './ActionPosition';

const controlSlice = createSlice({
  name: 'position',
  initialState: {
    loading: false,

    position_all: [] as IPosition[],
    position_current: {} as IPosition,
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
    changeVisibleSideBar(state: IPositionState) {
      state.isVisibleSideBar = !state.isVisibleSideBar;
    },
    changePages(state: IPositionState, action: any) {
      const current_page = state.current_page + action.payload;
      if (current_page > 0 && current_page <= state.all_pages) {
        state.current_page = current_page;
      }
    },
    getCurrentPosition(state: IPositionState, action: any) {
      state.position_current = action.current;
    },
    getCurrentPositionCompany(state: IPositionState, action: any) {
      state.position_company_current = action.payload.current_position_company;
      state.position_company_index = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosition.pending, (state: IPositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getPosition.fulfilled,
      (state: IPositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.position_all = payload.response.data;
        state.loading = false;
      }
    );
    builder.addCase(getPosition.rejected, (state: IPositionState) => {
      state.loading = false;
    });
    // getPositionCompanyAll
    builder.addCase(
      getPositionCompanyAll.pending,
      (state: IPositionState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getPositionCompanyAll.fulfilled,
      (state: IPositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.position_company_all = payload.response.data.results;
        state.loading = false;
      }
    );
    builder.addCase(getPositionCompanyAll.rejected, (state: IPositionState) => {
      state.loading = false;
    });
    // createPosition
    builder.addCase(createPosition.pending, (state: IPositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      createPosition.fulfilled,
      (state: IPositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.position_company_all = [...state.position_company_all, payload.response.data];
          payload.params.setIsAddedSideBar(false);
        }
        state.loading = false;
      }
    );
    builder.addCase(createPosition.rejected, (state: IPositionState) => {
      state.loading = false;
    });
    // changePosition
    builder.addCase(changePosition.pending, (state: IPositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      changePosition.fulfilled,
      (state: IPositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.position_company_all[state.position_company_index] = payload.response.data;
          payload.params.setIsVisibleSideBar(false);
        }

        state.loading = false;
      }
    );
    builder.addCase(changePosition.rejected, (state: IPositionState) => {
      state.loading = false;
    });
    // deletePosition
    builder.addCase(deletePosition.pending, (state: IPositionState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      deletePosition.fulfilled,
      (state: IPositionState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.position_company_all.splice(state.position_company_index, 1);
          state.position_company_current = {};
        }
        state.loading = false;
      }
    );
    builder.addCase(deletePosition.rejected, (state: IPositionState) => {
      state.loading = false;
    });
  },
});

export default controlSlice.reducer;
export const { changeVisibleSideBar, changePages, getCurrentPosition, getCurrentPositionCompany } =
  controlSlice.actions;
