import { ICompany } from './../../../ts/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersDefaults } from 'axios';
import { ICompanyState } from '../../../ts/storeTypes';
import {
  changeCompanyAdmin,
  createCompanyAdmin,
  deleteCompanyAdmin,
  getCompanyAdmin,
  getCompanyEmployes,
} from './ActionCompany';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}
interface IPayloadResponseArray {
  response: {
    data: {
      results: ICompany[];
    };
    status: number;
  };
  params?: any;
}
interface IPayloadResponse {
  response: {
    data: ICompany;
    status: number;
  };
  params?: any;
}

const companySlice = createSlice({
  name: 'company',
  initialState: {
    loading: false,
    company_admin_all: [] as ICompany[],
    company_admin_current: {} as ICompany,
    company_admin_index: 1,
    company_employes: [] as ICompany[],
    current_page: 1,
    all_pages: 10,
  },
  reducers: {
    changePagesCompany(state: ICompanyState, action: { payload: number }) {
      const current_page = state.current_page + action.payload;
      if (current_page > 0 && current_page <= state.all_pages) {
        state.current_page = current_page;
      }
    },
    setCurrentCompany(
      state: ICompanyState,
      action: { payload: { company_current: ICompany; index: number } }
    ) {
      state.company_admin_current = action.payload.company_current;
      state.company_admin_index = action.payload.index;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyEmployes.pending, (state: ICompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getCompanyEmployes.fulfilled,
      (state: ICompanyState, { payload }: PayloadAction<IPayloadResponseArray>) => {
        state.company_employes = payload.response.data.results;
        state.loading = false;
      }
    );
    builder.addCase(getCompanyEmployes.rejected, (state: ICompanyState) => {
      state.loading = false;
    });

    builder.addCase(getCompanyAdmin.pending, (state: ICompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      getCompanyAdmin.fulfilled,
      (state: ICompanyState, { payload }: PayloadAction<any>) => {
        console.log(payload);

        state.company_admin_all = payload.response.data.results
          ? payload.response.data.results
          : payload.response.data;
        state.loading = false;
      }
    );
    builder.addCase(getCompanyAdmin.rejected, (state: ICompanyState) => {
      state.loading = false;
    });
    // createCompanyAdmin
    builder.addCase(createCompanyAdmin.pending, (state: ICompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      createCompanyAdmin.fulfilled,
      (state: ICompanyState, { payload }: PayloadAction<IPayloadResponse>) => {
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
    builder.addCase(createCompanyAdmin.rejected, (state: ICompanyState) => {
      state.loading = false;
    });
    // changeCompanyAdmin
    builder.addCase(changeCompanyAdmin.pending, (state: ICompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      changeCompanyAdmin.fulfilled,
      (state: ICompanyState, { payload }: PayloadAction<IPayloadResponse>) => {
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
    builder.addCase(changeCompanyAdmin.rejected, (state: ICompanyState) => {
      state.loading = false;
    });
    // deleteCompanyAdmin
    builder.addCase(deleteCompanyAdmin.pending, (state: ICompanyState, action: PayloadAction) => {
      state.loading = true;
    });
    builder.addCase(
      deleteCompanyAdmin.fulfilled,
      (state: ICompanyState, { payload }: PayloadAction<IPayloadResponse>) => {
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
    builder.addCase(deleteCompanyAdmin.rejected, (state: ICompanyState) => {
      state.loading = false;
    });
  },
});

export default companySlice.reducer;
export const { changePagesCompany, setCurrentCompany } = companySlice.actions;
