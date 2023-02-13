import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface cookieSliceTypes {
    isCookieBannerVisible: boolean;
    isCookieAccepted: boolean;
}

// /. interfaces

const initialState: cookieSliceTypes = {
    isCookieBannerVisible: true,
    isCookieAccepted: false
};

// /. initialState

const cookieSlice = createSlice({
    name: 'cookieSlice',
    initialState,
    reducers: {
        switchCookieBannerVisibleStatus(state, action: PayloadAction<boolean>) {
            state.isCookieBannerVisible = action.payload;
        },
        switchCookieAcceptedStatus(state, action: PayloadAction<boolean>) {
            state.isCookieAccepted = action.payload;
        }
    }
});

export const { switchCookieBannerVisibleStatus, switchCookieAcceptedStatus } =
    cookieSlice.actions;

export default cookieSlice.reducer;
