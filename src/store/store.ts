import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import taskSlice from './taskSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  task: taskSlice
});

export const setupStore = () => { return configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']