import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth/authSlice';
import companySlice from './reducers/company/companySlice';
import controlSlice from './reducers/control/controlSlice';
import employesSlice from './reducers/employes/employesSlice';
import positionSlice from './reducers/position/positionSlice';
import taskSlice from './reducers/tasks/taskSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  task: taskSlice,
  company: companySlice,
  employes: employesSlice,
  control: controlSlice,
  position: positionSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
