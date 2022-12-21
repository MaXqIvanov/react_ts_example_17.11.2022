import { ITaskCurrent } from './../../../ts/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import { IControlState, IPosition, ITask } from '../../../ts/storeTypes';
import { getControlTaskAll, getPosition, taskApprove, taskReject } from './ActionControl';

// payload.response.data.results;
interface IActionPayload {
  response: {
    data: {
      results?: any;
    };
    status: number;
  };
}
const controlSlice = createSlice({
  name: 'control',
  initialState: {
    loading: false,

    position_all: [] as IPosition[],
    position_current: {} as IPosition,
    // for sidebar
    isVisibleSideBar: false,
    // get control data for table
    controls_task_all: [] as ITask[],
    controls_task_current: {} as ITaskCurrent,
    controls_task_index: 0,
    current_page: 1,
    all_pages: 10,
  },
  reducers: {
    changeVisibleSideBar(state: IControlState) {
      state.isVisibleSideBar = !state.isVisibleSideBar;
    },
    changePagesControl(state: IControlState, action: { payload: number }) {
      const current_page = state.current_page + action.payload;
      if (current_page > 0 && current_page <= state.all_pages) {
        state.current_page = current_page;
      }
    },
    selectCurrentPosition(
      state: IControlState,
      action: { payload: { current_position: number; setIsVisibleSelect: CallableFunction } }
    ) {
      state.position_current = action.payload.current_position;
      action.payload.setIsVisibleSelect(false);
    },
    setControlsTaskCurrent(
      state: IControlState,
      action: { payload: { task_current: ITask; index: number } }
    ) {
      state.controls_task_current = action.payload.task_current;
      state.controls_task_index = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getControlTaskAll.pending, (state: IControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getControlTaskAll.fulfilled,
      (state: IControlState, { payload }: PayloadAction<IActionPayload>) => {
        if (payload.response.status < 300) {
          state.controls_task_all = payload.response.data.results;
        }
        state.loading = false;
      }
    );
    builder.addCase(getControlTaskAll.rejected, (state: IControlState) => {
      state.loading = false;
    });

    builder.addCase(getPosition.pending, (state: IControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getPosition.fulfilled,
      (state: IControlState, { payload }: PayloadAction<IActionPayload>) => {
        console.log(payload);

        state.position_all = payload.response.data as IPosition[];
        state.loading = false;
      }
    );
    builder.addCase(getPosition.rejected, (state: IControlState) => {
      state.loading = false;
    });
    // taskApprove
    builder.addCase(taskApprove.pending, (state: IControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      taskApprove.fulfilled,
      (state: IControlState, { payload }: PayloadAction<IActionPayload>) => {
        if (payload.response.status < 300) {
          state.controls_task_all.splice(state.controls_task_index, 1);
          state.isVisibleSideBar = false;
        }
        state.loading = false;
      }
    );
    builder.addCase(taskApprove.rejected, (state: IControlState) => {
      state.loading = false;
    });
    // taskReject
    builder.addCase(taskReject.pending, (state: IControlState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      taskReject.fulfilled,
      (state: IControlState, { payload }: PayloadAction<IActionPayload>) => {
        if (payload.response.status < 300) {
          state.controls_task_all.splice(state.controls_task_index, 1);
          state.isVisibleSideBar = false;
        }
        state.loading = false;
      }
    );
    builder.addCase(taskReject.rejected, (state: IControlState) => {
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
