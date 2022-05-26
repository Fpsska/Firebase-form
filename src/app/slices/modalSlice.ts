import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { modalPositionTypes } from '../../Types/modalSliceTypes';

// /. imports

interface mainSliceTypes {
    isModalAuthVisible: boolean,
    isModalRegistrVisible: boolean,
    isModalTermsVisible: boolean,
    modalAuthPosition: modalPositionTypes,
    modalRegistrPosition: modalPositionTypes
}

// /. interfaces

const initialState: mainSliceTypes = {
    isModalAuthVisible: false,
    isModalRegistrVisible: false,
    isModalTermsVisible: false,
    modalAuthPosition: { top: 0, left: 0 },
    modalRegistrPosition: { top: 0, left: 0 }
};

// /. initialState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        switchModalAuthVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isModalAuthVisible = action.payload;
        },
        switchModalRegistrVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isModalRegistrVisible = action.payload;
        },
        setNewModalAuthPosition(state, action: PayloadAction<modalPositionTypes>) {
            state.modalAuthPosition = action.payload;
        },
        setNewModalRegistrPosition(state, action: PayloadAction<modalPositionTypes>) {
            state.modalRegistrPosition = action.payload;
        },
        switchModalTermsVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isModalTermsVisible = action.payload;
        }
    }
});

export const {
    switchModalAuthVisibleStatus,
    switchModalRegistrVisibleStatus,
    switchModalTermsVisibleStatus,
    setNewModalAuthPosition,
    setNewModalRegistrPosition
} = mainSlice.actions;


export default mainSlice.reducer;