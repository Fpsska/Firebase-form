import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    isAuthorisationPage: boolean,
    isHomePage: boolean,
}

// /. interfaces

const initialState: mainSliceTypes = {
    isAuthorisationPage: true,
    isHomePage: false
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
        }
    }
});

export const {
    switchAuthorisationPageStatus,
    switchHomePageStatus
} = mainSlice.actions;


export default mainSlice.reducer;