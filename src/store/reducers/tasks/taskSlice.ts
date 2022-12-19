import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import { TaskState } from '../../../ts/storeTypes';
import moment from 'moment';
import { changeTask, createTask, finishTask, getCurrentTask, getTaskAll, getTaskDay, getTaskWeek } from './ActionSlice';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    // loading
    loading: false,
    // for work
    variant_table: [
      { id: 1, title: 'Все' },
      { id: 2, title: 'Неделя' },
      { id: 3, title: 'День' },
    ],
    current_variant_table: 2,
    // for sidebar
    isVisibleSideBar: false,
    // task for day
    get_all_task_day: [],
    current_task_day: {},
    // task for week
    get_all_task_week: [],
    current_task_week: {} as any,
    current_task_index: 0,
    // task for all
    get_all_task_all: [],
    current_task_all: {},
    // for pagination for day
    current_page_day: 1,
    all_pages_day: 1,
    // for pagination for week
    current_page_week: 1,
    all_pages_week: 1,
    // for pagination for all
    current_page_all: 1,
    all_pages_all: 1,

    need_load_data: false,
  },
  reducers: {
    setCurrentVariantTable(state: TaskState, action: any) {
      state.current_variant_table = action.payload;
    },
    changeVisibleSideBar(state: TaskState) {
      state.isVisibleSideBar = !state.isVisibleSideBar;
    },
    changePagesDay(state: TaskState, action: any) {
      const current_page_day = state.current_page_day + action.payload;
      if (current_page_day > 0 && current_page_day <= state.all_pages_day) {
        state.current_page_day = current_page_day;
      }
    },
    changePagesWeek(state: TaskState, action: any) {
      const current_page_week = state.current_page_week + action.payload;
      if (current_page_week > 0 && current_page_week <= state.all_pages_week) {
        state.current_page_week = current_page_week;
      }
    },
    changePagesAll(state: TaskState, action: any) {
      const current_page_all = state.current_page_all + action.payload;
      if (current_page_all > 0 && current_page_all <= state.all_pages_all) {
        state.current_page_all = current_page_all;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskDay.pending, (state: TaskState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(getTaskDay.fulfilled, (state: TaskState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.get_all_task_week = payload.response.data;
      state.loading = false;
    });
    builder.addCase(getTaskDay.rejected, (state: TaskState) => {
      state.loading = false;
    });

    builder.addCase(getTaskWeek.pending, (state: TaskState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(getTaskWeek.fulfilled, (state: TaskState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      if (payload.response.status < 300) {
        state.get_all_task_week = payload.response.data;
      }
      state.loading = false;
    });
    builder.addCase(getTaskWeek.rejected, (state: TaskState) => {
      state.loading = false;
    });

    builder.addCase(getTaskAll.pending, (state: TaskState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(getTaskAll.fulfilled, (state: TaskState, { payload }: PayloadAction<any>) => {
      if (payload.response.status < 300) {
        state.get_all_task_week = payload.response.data.results;
      }
      state.loading = false;
    });
    builder.addCase(getTaskAll.rejected, (state: TaskState) => {
      state.loading = false;
    });
    // finishTask
    builder.addCase(finishTask.pending, (state: TaskState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(finishTask.fulfilled, (state: TaskState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      if (payload.response.status < 300) {
        const current_day_week = moment().toDate().getDay() - 1;
        alert(payload.response.data.detail);
        try {
          state.get_all_task_week[state.current_task_index].days[current_day_week] = {
            ...state.get_all_task_week[state.current_task_index].days[current_day_week],
            status: 'green',
          };
        } catch (error) {}
      } else {
        alert(payload.response.data.detail);
      }
      state.isVisibleSideBar = false;
      state.loading = false;
    });
    builder.addCase(finishTask.rejected, (state: TaskState) => {
      state.loading = false;
    });
    // createTask
    builder.addCase(createTask.pending, (state: TaskState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state: TaskState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      if (payload.response.status < 300) {
        alert('Создание задачи прошло успешно');
        state.isVisibleSideBar = false;
        state.need_load_data = !state.need_load_data;
      }
      state.loading = false;
    });
    builder.addCase(createTask.rejected, (state: TaskState) => {
      state.loading = false;
    });
    // getCurrentTask
    builder.addCase(getCurrentTask.pending, (state: TaskState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getCurrentTask.fulfilled,
      (state: TaskState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        state.current_task_index = payload.params.index;
        state.current_task_week = payload.response.data;
        state.loading = false;
      }
    );
    builder.addCase(getCurrentTask.rejected, (state: TaskState) => {
      state.loading = false;
    });
    builder.addCase(changeTask.pending, (state: TaskState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(changeTask.fulfilled, (state: TaskState, { payload }: PayloadAction<any>) => {
      console.log(payload);
      state.need_load_data = !state.need_load_data;
      state.loading = false;
    });
    builder.addCase(changeTask.rejected, (state: TaskState) => {
      state.loading = false;
    });
  },
});

export default taskSlice.reducer;
export const {
  setCurrentVariantTable,
  changeVisibleSideBar,
  changePagesDay,
  changePagesWeek,
  changePagesAll,
} = taskSlice.actions;
