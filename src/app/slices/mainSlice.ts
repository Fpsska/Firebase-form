import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    isAuthorisationPage: boolean
}

// /. interfaces

const initialState: mainSliceTypes = {
    isAuthorisationPage: true
};

// /. initialState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        switchAuthorisationPageStatus(state, action: PayloadAction<boolean>) {
            state.isAuthorisationPage = action.payload;
        }
    }
});

export const {
    switchAuthorisationPageStatus
} = mainSlice.actions;


export default mainSlice.reducer;