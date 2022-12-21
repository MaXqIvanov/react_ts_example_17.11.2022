import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import { ControlState } from '../../../ts/storeTypes';
import { getControlTaskAll, getPosition, taskApprove, taskReject } from './ActionControl';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const controlSlice = createSlice({
  name: 'control',
  initialState: {
    loading: false,

    position_all: [],
    position_current: {} as any,
    // for sidebar
    isVisibleSideBar: false,
    // get control data for table
    controls_task_all: [],
    controls_task_current: {} as any,
    controls_task_index: 0,
    current_page: 1,
    all_pages: 10,
  },
  reducers: {
    changeVisibleSideBar(state: ControlState) {
      state.isVisibleSideBar = !state.isVisibleSideBar;
    },
    changePagesControl(state: ControlState, action: any) {
      const current_page = state.current_page + action.payload;
      if (current_page > 0 && current_page <= state.all_pages) {
        state.current_page = current_page;
      }
    },
    selectCurrentPosition(state: ControlState, action: any) {
      state.position_current = action.payload.current_position;
      action.payload.setIsVisibleSelect(false);
    },
    setControlsTaskCurrent(state: ControlState, action: any) {
      state.controls_task_current = action.payload.task_current;
      state.controls_task_index = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getControlTaskAll.pending, (state: ControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getControlTaskAll.fulfilled,
      (state: ControlState, { payload }: PayloadAction<any>) => {
        if (payload.response.status < 300) {
          state.controls_task_all = payload.response.data.results;
        }
        state.loading = false;
      }
    );
    builder.addCase(getControlTaskAll.rejected, (state: ControlState) => {
      state.loading = false;
    });

    builder.addCase(getPosition.pending, (state: ControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getPosition.fulfilled,
      (state: ControlState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.position_all = payload.response.data;
        state.loading = false;
      }
    );
    builder.addCase(getPosition.rejected, (state: ControlState) => {
      state.loading = false;
    });
    // taskApprove
    builder.addCase(taskApprove.pending, (state: ControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      taskApprove.fulfilled,
      (state: ControlState, { payload }: PayloadAction<any>) => {
        if (payload.response.status < 300) {
          state.controls_task_all.splice(state.controls_task_index, 1);
          state.isVisibleSideBar = false;
        }
        state.loading = false;
      }
    );
    builder.addCase(taskApprove.rejected, (state: ControlState) => {
      state.loading = false;
    });
    // taskReject
    builder.addCase(taskReject.pending, (state: ControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      taskReject.fulfilled,
      (state: ControlState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 300) {
          state.controls_task_all.splice(state.controls_task_index, 1);
          state.isVisibleSideBar = false;
        }
        state.loading = false;
      }
    );
    builder.addCase(taskReject.rejected, (state: ControlState) => {
      state.loading = false;
    });
  },
});

export default controlSlice.reducer;
export const {
  changeVisibleSideBar,
  changePagesControl,
  selectCurrentPosition,
  setControlsTaskCurrent,
} = controlSlice.actions;
