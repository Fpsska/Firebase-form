import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface userSliceTypes {
    currentEmail: null | string;
    currentToken: null | string;
    currentID: null | string;
    lastSignInTime: null | string;
    isUserAuthorise: boolean;
}

// /. interfaces

const storageAuthStatus = JSON.parse(
    localStorage.getItem('isUserAuthStatus') || 'false'
);
const storageUserData = JSON.parse(localStorage.getItem('userData') || '{}');

const initialState: userSliceTypes = {
    currentEmail: storageUserData.email,
    currentToken: null,
    currentID: null,
    lastSignInTime: storageUserData.lastSignInTime,
    isUserAuthorise: storageAuthStatus
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        saveNewUser(state, action) {
            const { email, token, id, lastSignInTime } = action.payload;
            // /. payload
            state.currentEmail = email;
            state.currentToken = token;
            state.currentID = id;
            state.lastSignInTime = lastSignInTime;
        },
        deleteCurrentUser(state) {
            state.currentEmail = null;
            state.currentToken = null;
            state.currentID = null;
            state.lastSignInTime = null;
        },
        switchUserAuthoriseStatus(state, action: PayloadAction<boolean>) {
            state.isUserAuthorise = action.payload;
        }
    }
});

export const { saveNewUser, deleteCurrentUser, switchUserAuthoriseStatus } =
    userSlice.actions;

export default userSlice.reducer;
