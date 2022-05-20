import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import mainSlice from './slices/mainSlice';
import formSlice from './slices/formSlice';

export const store = configureStore({
  reducer: {
    mainSlice: mainSlice,
    formSlice: formSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
