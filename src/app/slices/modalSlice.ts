import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { modalPositionTypes, modalStatusTypes } from '../../Types/modalSliceTypes';

// /. imports

interface modalSliceTypes {
    modalStatus: modalStatusTypes,
    modalAuthPosition: modalPositionTypes,
    modalRegistrPosition: modalPositionTypes
}

// /. interfaces

const initialState: modalSliceTypes = {
    modalStatus: {
        isModalAuthVisible: false,
        isModalRegistrVisible: false,
        isModalTermsVisible: false
    },
    modalAuthPosition: { top: 0, left: 0 },
    modalRegistrPosition: { top: 0, left: 0 }
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
        setNewModalAuthPosition(state, action: PayloadAction<modalPositionTypes>) {
            state.modalAuthPosition = action.payload;
        },
        setNewModalRegistrPosition(state, action: PayloadAction<modalPositionTypes>) {
            state.modalRegistrPosition = action.payload;
        }
    }
});

export const {
    switchModalVisibleStatus,
    setNewModalAuthPosition,
    setNewModalRegistrPosition
} = modalSlice.actions;


export default modalSlice.reducer;