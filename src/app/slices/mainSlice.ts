import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    isAuthorisationPage: boolean,
    isHomePage: boolean,
    isModalAuthVisible: boolean,
    isModalRegistrVisible: boolean,
    modalAuthPosition: any,
    modalRegistrPosition: any
}

// /. interfaces

const initialState: mainSliceTypes = {
    isAuthorisationPage: true,
    isHomePage: false,
    isModalAuthVisible: false,
    isModalRegistrVisible: false,
    modalAuthPosition: { top: 10, left: 10 },
    modalRegistrPosition: { top: 20, left: 20 }
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
        },
        setNewModalAuthPosition(state, action: PayloadAction<any>) {
            state.modalAuthPosition = action.payload;
        },
        setNewModalRegistrPosition(state, action: PayloadAction<any>) {
            state.modalRegistrPosition = action.payload;
        }
    }
});

export const {
    switchAuthorisationPageStatus,
    switchHomePageStatus,
    switchModalAuthVisibleStatus,
    switchModalRegistrVisibleStatus,
    setNewModalAuthPosition,
    setNewModalRegistrPosition
} = mainSlice.actions;


export default mainSlice.reducer;