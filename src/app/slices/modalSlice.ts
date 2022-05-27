import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { coordinatesTypes, modalPositionsTypes, modalStatusTypes } from '../../Types/modalSliceTypes';

// /. imports

interface modalSliceTypes {
    modalStatus: modalStatusTypes,
    modalPositions: modalPositionsTypes
}

// /. interfaces

const initialState: modalSliceTypes = {
    modalStatus: {
        isModalAuthVisible: false,
        isModalRegistrVisible: false,
        isModalTermsVisible: false
    },
    modalPositions: {
        modalAuthPosition: { top: 0, left: 0 },
        modalRegistrPosition: { top: 0, left: 0 },
        modalTermsPosition: { top: 0, left: 0 }
    }
};

// /. initialState

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        switchModalVisibleStatus(state, action: PayloadAction<{ name: string, status: boolean }>) {
            const { name, status } = action.payload;
            switch (name) {
                case 'auth-modal':
                    state.modalStatus.isModalAuthVisible = status;
                    break;
                case 'registr-modal':
                    state.modalStatus.isModalRegistrVisible = status;
                    break;
                case 'terms-modal':
                    state.modalStatus.isModalTermsVisible = status;
                    break;
            }
        },
        setNewModalPosition(state, action: PayloadAction<{ name: string, coordinates: coordinatesTypes }>) {
            const { name, coordinates } = action.payload;
            switch (name) {
                case 'auth-modal':
                    state.modalPositions.modalAuthPosition = coordinates;
                    console.log('auth-modal')
                    break;
                case 'registr-modal':
                    state.modalPositions.modalRegistrPosition = coordinates;
                    console.log('registr-modal')
                    break;
                case 'terms-modal':
                    state.modalPositions.modalTermsPosition = coordinates;
                    console.log('terms-modal')
                    break;
            }
        }
    }
});

export const {
    switchModalVisibleStatus,
    setNewModalPosition
} = modalSlice.actions;


export default modalSlice.reducer;