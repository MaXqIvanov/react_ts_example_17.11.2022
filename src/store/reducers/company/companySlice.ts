import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import { TCompanyState } from '../../../ts/storeTypes';
import { changeCompanyAdmin, createCompanyAdmin, deleteCompanyAdmin, getCompanyAdmin, getCompanyEmployes } from './ActionCompany';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const companySlice = createSlice({
  name: 'company',
  initialState: {
    loading: false,
    company_admin_all: [],
    company_admin_current: {} as any,
    company_admin_index: 1,
    company_employes: [],
    // one_company user
    // for admin_company
    // for pagination
    current_page: 1,
    all_pages: 10,
  },
  reducers: {
    changePagesCompany(state: TCompanyState, action: any) {
      const current_page = state.current_page + action.payload;
      if (current_page > 0 && current_page <= state.all_pages) {
        state.current_page = current_page;
      }
    },
    setCurrentCompany(
      state: TCompanyState,
      action: { payload: { company_current: Object; index: number } }
    ) {
      state.company_admin_current = action.payload.company_current;
      state.company_admin_index = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyEmployes.pending, (state: TCompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getCompanyEmployes.fulfilled,
      (state: TCompanyState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.company_employes = payload.response.data.results;
        state.loading = false;
      }
    );
    builder.addCase(getCompanyEmployes.rejected, (state: TCompanyState) => {
      state.loading = false;
    });

    builder.addCase(getCompanyAdmin.pending, (state: TCompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getCompanyAdmin.fulfilled,
      (state: TCompanyState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.company_admin_all = payload.response.data.results
          ? payload.response.data.results
          : payload.response.data;
        state.loading = false;
      }
    );
    builder.addCase(getCompanyAdmin.rejected, (state: TCompanyState) => {
      state.loading = false;
    });
    // createCompanyAdmin
    builder.addCase(createCompanyAdmin.pending, (state: TCompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      createCompanyAdmin.fulfilled,
      (state: TCompanyState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.company_admin_all = [...state.company_admin_all, payload.response.data];
          payload.params.setIsAddedSideBar(false);
        } else {
          alert(
            payload.response.data.name
              ? payload.response.data.name[0]
              : 'Создать компанию не получилось'
          );
        }
        state.loading = false;
      }
    );
    builder.addCase(createCompanyAdmin.rejected, (state: TCompanyState) => {
      state.loading = false;
    });
    // changeCompanyAdmin
    builder.addCase(changeCompanyAdmin.pending, (state: TCompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      changeCompanyAdmin.fulfilled,
      (state: TCompanyState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.company_admin_all[state.company_admin_index] = payload.response.data;
          payload.params.setIsVisibleSideBar(false);
        } else {
          alert(
            payload.response.data.name
              ? payload.response.data.name[0]
              : 'Изменить компанию не получилось'
          );
        }
        state.loading = false;
      }
    );
    builder.addCase(changeCompanyAdmin.rejected, (state: TCompanyState) => {
      state.loading = false;
    });
    // deleteCompanyAdmin
    builder.addCase(deleteCompanyAdmin.pending, (state: TCompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      deleteCompanyAdmin.fulfilled,
      (state: TCompanyState, { payload }: PayloadAction<any>) => {
        console.log(payload);
        if (payload.response.status < 400) {
          state.company_admin_all.splice(state.company_admin_index, 1);
        } else {
          alert(
            payload.response.data.name
              ? payload.response.data.name[0]
              : 'Удалить компанию не получилось'
          );
        }
        state.loading = false;
      }
    );
    builder.addCase(deleteCompanyAdmin.rejected, (state: TCompanyState) => {
      state.loading = false;
    });
  },
});

export default companySlice.reducer;
export const { changePagesCompany, setCurrentCompany } = companySlice.actions;
