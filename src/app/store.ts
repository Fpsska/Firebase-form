import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import mainSlice from './slices/mainSlice';
import formSlice from './slices/formSlice';
import userSlice from './slices/userSlice';
import modalSlice from './slices/modalSlice';
import cookieSlice from './slices/cookieSlice';

// /. imports

export const store = configureStore({
    reducer: {
        mainSlice,
        formSlice,
        userSlice,
        modalSlice,
        cookieSlice
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
