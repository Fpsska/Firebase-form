import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { formFieldsTypes } from '../../Types/formSliceTypes';

// /. imports

interface formSliceTypes {
    formAuthFields: formFieldsTypes[],
    formRegistrationFields: formFieldsTypes[],
    isUserRemembered: boolean,
    isTermsAccepted: boolean,
    isPasswordHidden: boolean,
    currentEmail: string,
    currentPassword: string
}

// /. interfaces

const initialState: formSliceTypes = {
    formAuthFields: [
        {
            id: 1,
            type: 'text',
            htmlFor: 'email',
            label: 'Email Addres',
            placeholder: 'johndoe@gmail.com'
        },
        {
            id: 2,
            type: 'password',
            htmlFor: 'password',
            label: 'Password',
            placeholder: ''
        }
    ],
    formRegistrationFields: [
        {
            id: 1,
            type: 'text',
            htmlFor: 'fullName',
            label: 'Full Name',
            placeholder: 'John Doe'
        },
        {
            id: 2,
            type: 'text',
            htmlFor: 'email',
            label: 'Email Addres',
            placeholder: 'johndoe@gmail.com'
        },
        {
            id: 3,
            type: 'password',
            htmlFor: 'password',
            label: 'Password',
            placeholder: ''
        },
        {
            id: 4,
            type: 'password',
            htmlFor: 'confirm-password',
            label: 'Confirm Password',
            placeholder: ''
        }
    ],
    isUserRemembered: false,
    isTermsAccepted: false,
    isPasswordHidden: true,
    currentEmail: '',
    currentPassword: ''
};

// /. initialState

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        switchUserRememberedStatus(state, actions: PayloadAction<boolean>) {
            state.isUserRemembered = actions.payload;
        },
        switchTermsAcceptedStatus(state, actions: PayloadAction<boolean>) {
            state.isTermsAccepted = actions.payload;
        },
        switchPasswordHiddenStatus(state, actions: PayloadAction<boolean>) {
            state.isPasswordHidden = actions.payload;
        },
        setCurrentEmail(state, action: PayloadAction<string>) {
            state.currentEmail = action.payload;
        },
        setCurrentPassword(state, action: PayloadAction<string>) {
            state.currentPassword = action.payload;
        }
    }
});

export const {
    switchUserRememberedStatus,
    switchTermsAcceptedStatus,
    switchPasswordHiddenStatus,
    setCurrentEmail,
    setCurrentPassword
} = formSlice.actions;


export default formSlice.reducer;