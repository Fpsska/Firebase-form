import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports

interface userSliceTypes {
    currentEmail: null;
    currentToken: null;
    currentID: null;
    lastSignInTime: null;
    isUserAuthorise: boolean;
}

// /. interfaces

const initialState: userSliceTypes = {
    currentEmail: null,
    currentToken: null,
    currentID: null,
    lastSignInTime: null,
    isUserAuthorise: false
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        saveNewUser(state, action) {
            const { email, token, id, lastSignInTime } = action.payload;
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
