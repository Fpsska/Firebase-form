import { createSlice } from '@reduxjs/toolkit';

// /. imports

interface userSliceTypes {
    currentEmail: null,
    currentToken: null,
    currentID: null
}

// /. interfaces

const initialState: userSliceTypes = {
    currentEmail: null,
    currentToken: null,
    currentID: null
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        saveNewUser(state, action) {
            const { email, token, id } = action.payload;
            state.currentEmail = email;
            state.currentToken = token;
            state.currentID = id;
        },
        deleteCurrentUser(state) {
            state.currentEmail = null;
            state.currentToken = null;
            state.currentID = null;
        }
    }
});

export const {
    saveNewUser,
    deleteCurrentUser
} = userSlice.actions;

export default userSlice.reducer;