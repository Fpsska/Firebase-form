import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    isAuthorisationPage: boolean,
    isHomePage: boolean,
    isModalVisible: boolean
}

// /. interfaces

const initialState: mainSliceTypes = {
    isAuthorisationPage: true,
    isHomePage: false,
    isModalVisible: false
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
        switchModalVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isModalVisible = action.payload;
        }
    }
});

export const {
    switchAuthorisationPageStatus,
    switchHomePageStatus,
    switchModalVisibleStatus
} = mainSlice.actions;


export default mainSlice.reducer;