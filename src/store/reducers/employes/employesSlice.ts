import { EmployesState } from '../../../ts/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import {
  changeEmployesCompany,
  changeEmployesCompanyAdmin,
  createEmployesCompany,
  createEmployesCompanyAdmin,
  deleteEmployesCompany,
  deleteEmployesCompanyAdmin,
  getEmployesAdmin,
  getEmployesAll,
  getEmployesCompany,
  getEmployesCompanyAdmin,
} from './ActionEmployes';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const controlSlice = createSlice({
  name: 'employes',
  initialState: {
    loading: false,

    // for sidebar
    isVisibleSideBar: false,
    isVisibleSideBarCreate: false,
    // get_employes_all
    employes_all: [],
    employes_current: {} as any,
    employes_current_index: 1,
    // for pagination
    current_page: 1,
    all_pages: 10,

    // section_company_employes
    employes_company_all: [],
    employes_company_current: {} as any,
    employes_company_index: 1,
    current_page_company_employes: 1,
    all_pages_company_employes: 10,
    // section_admin_employes
    employes_admin_all: [],
    employes_admin_current: {} as any,
    employes_admin_index: 1,
    position_all_admin: [],
  },
  reducers: {
    changeVisibleSideBar(state: EmployesState, action: any) {
      state.isVisibleSideBar = !state.isVisibleSideBar;
    },
    changeVisibleSideBarCreate(state: EmployesState, action: any) {
      state.isVisibleSideBarCreate = !state.isVisibleSideBarCreate;
    },
    setCurrentEmployes(state: EmployesState, action: any) {
      state.employes_current = action.payload.employes_current;
      state.employes_company_index = action.payload.index;
    },
    changePages(state: EmployesState, action: any) {
      const current_page = state.current_page + action.payload;
      if (current_page > 0 && current_page <= state.all_pages) {
        state.current_page = current_page;
      }
    },
    // section_company_employes
    setCurrentEmployesCompany(state: EmployesState, action: any) {
      state.employes_company_current = action.payload.employes_current;
      state.employes_current_index = action.payload.index;
    },

    // section_company_employes
    changePagesCompanyEmployes(state: EmployesState, action: any) {
      const current_page_company_employes = state.current_page_company_employes + action.payload;
      if (
        current_page_company_employes > 0 &&
        current_page_company_employes <= state.all_pages_company_employes
      ) {
        state.current_page_company_employes = current_page_company_employes;
      }
    },

    getCurrentAdmin(state: EmployesState, action: any) {
      state.employes_admin_current = action.payload.admin_current;
      state.employes_admin_index = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployesAll.pending, (state: EmployesState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getEmployesAll.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        state.employes_all = payload.response.data.results;
        state.loading = false;
      }
    );
    builder.addCase(getEmployesAll.rejected, (state: EmployesState) => {
      state.loading = false;
    });

    builder.addCase(getEmployesCompany.pending, (state: EmployesState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getEmployesCompany.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        state.employes_company_all = payload.response.data.results;
        state.loading = false;
      }
    );
    builder.addCase(getEmployesCompany.rejected, (state: EmployesState) => {
      state.loading = false;
    });
    // createEmployesCompany
    builder.addCase(
      createEmployesCompany.pending,
      (state: EmployesState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      createEmployesCompany.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.employes_company_all = [...state.employes_company_all, payload.response.data];
          payload.params.setIsAddedSideBar(false);
        } else {
          alert('Данный телефон уже зарегистриован в системе');
        }
        state.loading = false;
      }
    );
    builder.addCase(createEmployesCompany.rejected, (state: EmployesState) => {
      state.loading = false;
    });
    // changeEmployesCompany
    builder.addCase(
      changeEmployesCompany.pending,
      (state: EmployesState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      changeEmployesCompany.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.employes_company_all[state.employes_company_index] = payload.response.data;
          payload.params.setIsVisibleSideBar(false);
        }
        state.loading = false;
      }
    );
    builder.addCase(changeEmployesCompany.rejected, (state: EmployesState) => {
      state.loading = false;
    });
    // deleteEmployesCompany
    builder.addCase(
      deleteEmployesCompany.pending,
      (state: EmployesState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      deleteEmployesCompany.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.employes_company_all.splice(state.employes_company_index, 1);
          state.employes_company_current = {};
        }
        state.loading = false;
      }
    );
    builder.addCase(deleteEmployesCompany.rejected, (state: EmployesState) => {
      state.loading = false;
    });

    builder.addCase(getEmployesAdmin.pending, (state: EmployesState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getEmployesAdmin.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        state.employes_admin_all = payload.response.data.results;
        state.loading = false;
      }
    );
    builder.addCase(getEmployesAdmin.rejected, (state: EmployesState) => {
      state.loading = false;
    });
    // getEmployesCompanyAdmin
    builder.addCase(
      getEmployesCompanyAdmin.pending,
      (state: EmployesState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getEmployesCompanyAdmin.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        state.position_all_admin = payload.response.data.results
          ? payload.response.data.results
          : payload.response.data;
        state.loading = false;
      }
    );
    builder.addCase(getEmployesCompanyAdmin.rejected, (state: EmployesState) => {
      state.loading = false;
    });
    // createEmployesCompanyAdmin
    builder.addCase(
      createEmployesCompanyAdmin.pending,
      (state: EmployesState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      createEmployesCompanyAdmin.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status >= 400) {
          alert(
            payload.response.data.phone
              ? payload.response.data.phone[0]
              : 'Создать администратора не получилось'
          );
        } else {
          state.employes_admin_all = [...state.employes_admin_all, payload.response.data];
          state.loading = false;
          payload.params.setIsAddedSideBar(false);
        }
      }
    );
    builder.addCase(createEmployesCompanyAdmin.rejected, (state: EmployesState) => {
      state.loading = false;
    });
    // changeEmployesCompanyAdmin
    builder.addCase(
      changeEmployesCompanyAdmin.pending,
      (state: EmployesState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      changeEmployesCompanyAdmin.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        state.employes_admin_all[state.employes_admin_index] = payload.response.data;
        state.loading = false;
        payload.params.setIsVisibleSideBar(false);
      }
    );
    builder.addCase(changeEmployesCompanyAdmin.rejected, (state: EmployesState) => {
      state.loading = false;
    });
    // deleteEmployesCompanyAdmin
    builder.addCase(
      deleteEmployesCompanyAdmin.pending,
      (state: EmployesState, action: PayloadAction) => {
        state.loading = true;
      }
    );
    builder.addCase(
      deleteEmployesCompanyAdmin.fulfilled,
      (state: EmployesState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        state.employes_admin_all.splice(state.employes_admin_index, 1);
        state.employes_admin_current = {};
        state.loading = false;
      }
    );
    builder.addCase(deleteEmployesCompanyAdmin.rejected, (state: EmployesState) => {
      state.loading = false;
    });
  },
});

export default controlSlice.reducer;
export const {
  setCurrentEmployesCompany,
  changeVisibleSideBar,
  getCurrentAdmin,
  changePages,
  changePagesCompanyEmployes,
  setCurrentEmployes,
  changeVisibleSideBarCreate,
} = controlSlice.actions;
