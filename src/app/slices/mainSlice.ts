import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface mainSliceTypes {
    isPreloaderVisible: boolean;
    pageStatuses: any;
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
                    state.pageStatuses.isAuthPage = true;
                    state.pageStatuses.isRegistrPage = false;
                    state.pageStatuses.isHomePage = false;
                    break;
                case '/authorisation-form/registration':
                    state.pageStatuses.isRegistrPage = true;
                    state.pageStatuses.isAuthPage = false;
                    state.pageStatuses.isHomePage = false;
                    break;
                case '/authorisation-form/home':
                    state.pageStatuses.isHomePage = true;
                    state.pageStatuses.isRegistrPage = false;
                    state.pageStatuses.isAuthPage = false;
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
