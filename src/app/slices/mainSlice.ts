import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    isAuthorisationPage: boolean,
    isHomePage: boolean,
    isModalAuthVisible: boolean,
    isModalRegistrVisible: boolean
}

// /. interfaces

const initialState: mainSliceTypes = {
    isAuthorisationPage: true,
    isHomePage: false,
    isModalAuthVisible: false,
    isModalRegistrVisible: false
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
        switchModalAuthVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isModalAuthVisible = action.payload;
        },
        switchModalRegistrVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isModalRegistrVisible = action.payload;
        }
    }
});

export const {
    switchAuthorisationPageStatus,
    switchHomePageStatus,
    switchModalAuthVisibleStatus,
    switchModalRegistrVisibleStatus
} = mainSlice.actions;


export default mainSlice.reducer;