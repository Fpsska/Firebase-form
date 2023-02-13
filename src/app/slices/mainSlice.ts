import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { handleObjProperties } from '../../helpers/handleObjProperties';

// /. imports

interface mainSliceTypes {
    isPreloaderVisible: boolean;
    pageStatuses: { [key: string]: boolean };
}

// /. interfaces

const initialState: mainSliceTypes = {
    isPreloaderVisible: false,
    pageStatuses: {
        isAuthPage: true,
        isRegistrPage: false,
        isHomePage: false
    }
};

// /. initialState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        switchPreloaderVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isPreloaderVisible = action.payload;
        },
        switchPageStatus(state, action: PayloadAction<{ locationData: any }>) {
            const { locationData } = action.payload;
            // /. payload

            const pathName = locationData.pathname.toLowerCase();

            switch (pathName) {
                case '/authorisation-form':
                    state.pageStatuses = handleObjProperties(
                        'isAuthPage',
                        state.pageStatuses
                    );
                    break;
                case '/authorisation-form/registration':
                    state.pageStatuses = handleObjProperties(
                        'isRegistrPage',
                        state.pageStatuses
                    );
                    break;
                case '/authorisation-form/home':
                    state.pageStatuses = handleObjProperties(
                        'isHomePage',
                        state.pageStatuses
                    );
                    break;
                default:
                    return;
            }
        }
    }
});

export const { switchPreloaderVisibleStatus, switchPageStatus } =
    mainSlice.actions;

export default mainSlice.reducer;
