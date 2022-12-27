import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    isAuthorisationPage: boolean;
    isHomePage: boolean;
    isPreloaderVisible: boolean;
}

// /. interfaces

const initialState: mainSliceTypes = {
    isAuthorisationPage: true,
    isHomePage: false,
    isPreloaderVisible: false
};

// /. initialState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        switchAuthorisationPageStatus(state, action: PayloadAction<boolean>) {
            state.isAuthorisationPage = action.payload;
        },
        switchHomePageStatus(state, action: PayloadAction<boolean>) {
            state.isHomePage = action.payload;
        },
        switchPreloaderVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isPreloaderVisible = action.payload;
        }
    }
});

export const {
    switchAuthorisationPageStatus,
    switchHomePageStatus,
    switchPreloaderVisibleStatus
} = mainSlice.actions;

export default mainSlice.reducer;
