import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { formFieldsTypes, passwordStatusesTypes } from '../../Types/formSliceTypes';

// /. imports

interface formSliceTypes {
    formAuthFields: formFieldsTypes[],
    formRegistrationFields: formFieldsTypes[],
    isUserRemembered: boolean,
    isTermsAccepted: boolean,
    passwordStatuses: passwordStatusesTypes,
    isAuthError: boolean,
    isRegistrError: boolean
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
    passwordStatuses: {
        isPasswordVisible: false,
        isConfirmPasswordVisible: false
    },
    isAuthError: false,
    isRegistrError: false
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
        switchPasswordVisibleStatuses(state, actions: PayloadAction<{ name: string, status: boolean }>) {
            const { name, status } = actions.payload;
            switch (name) {
                case 'password':
                    state.passwordStatuses.isPasswordVisible = status;
                    break;
                case 'confirm-password':
                    state.passwordStatuses.isConfirmPasswordVisible = status;
                    break;
            }
        },
        switchAuthErrorStatus(state, action: PayloadAction<boolean>) {
            state.isAuthError = action.payload;
        },
        switchRegistrErrorStatus(state, action: PayloadAction<boolean>) {
            state.isRegistrError = action.payload;
        }
    }
});

export const {
    switchUserRememberedStatus,
    switchTermsAcceptedStatus,
    switchPasswordVisibleStatuses,
    switchAuthErrorStatus,
    switchRegistrErrorStatus
} = formSlice.actions;


export default formSlice.reducer;