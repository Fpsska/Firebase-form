import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { handleObjProperties } from 'helpers/handleObjProperties';

import {
    coordinatesTypes,
    modalPositionsTypes,
    modalStatusTypes,
    modalSizeTypes
} from 'types/modalSliceTypes';

// /. imports

interface modalSliceTypes {
    modalStatuses: modalStatusTypes;
    modalPositions: modalPositionsTypes;
    modalSize: modalSizeTypes;
}

// /. interfaces

const initialState: modalSliceTypes = {
    modalStatuses: {
        isModalAuthVisible: false,
        isModalRegistrVisible: false,
        isModalTermsVisible: false,
        isModalExitVisible: false
    },
    modalPositions: {
        modalAuthPosition: { top: 0, left: 0 },
        modalRegistrPosition: { top: 0, left: 0 },
        modalTermsPosition: { top: 0, left: 0 },
        modalExitPosition: { top: 0, left: 0 }
    },
    modalSize: {
        width: 0,
        height: 0
    }
};

// /. initialState

const modalSlice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        switchModalVisibleStatus(
            state,
            action: PayloadAction<{ name: string; status: boolean }>
        ) {
            const { name, status } = action.payload;
            // /. payload

            switch (name) {
                case 'auth-modal':
                    state.modalStatuses.isModalAuthVisible = status;
                    break;
                case 'registr-modal':
                    state.modalStatuses.isModalRegistrVisible = status;
                    break;
                case 'terms-modal':
                    state.modalStatuses.isModalTermsVisible = status;
                    break;
                case 'exit-modal':
                    state.modalStatuses.isModalExitVisible = status;
                    break;
                case 'reset':
                    state.modalStatuses = handleObjProperties(
                        'reset',
                        state.modalStatuses
                    );
                    break;
                default:
                    return;
            }
        },
        setNewModalPosition(
            state,
            action: PayloadAction<{
                name: string;
                coordinates: coordinatesTypes;
            }>
        ) {
            const { name, coordinates } = action.payload;
            // /. payload

            switch (name) {
                case 'auth-modal':
                    state.modalPositions.modalAuthPosition = coordinates;
                    break;
                case 'registr-modal':
                    state.modalPositions.modalRegistrPosition = coordinates;
                    break;
                case 'terms-modal':
                    state.modalPositions.modalTermsPosition = coordinates;
                    break;
                case 'exit-modal':
                    state.modalPositions.modalExitPosition = coordinates;
                    break;
                default:
                    return;
            }
        },
        setModalSize(
            state,
            action: PayloadAction<{ width: number; height: number }>
        ) {
            const { width, height } = action.payload;
            // /. payload

            state.modalSize = {
                width,
                height
            };
        }
    }
});

export const { switchModalVisibleStatus, setNewModalPosition, setModalSize } =
    modalSlice.actions;

export default modalSlice.reducer;
