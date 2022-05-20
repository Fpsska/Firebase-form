import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { formFieldsTypes } from '../../Types/formSliceTypes';

// /. imports

interface formSliceTypes {
    formAuthFields: formFieldsTypes[],
    formRegistrationFields: formFieldsTypes[]
}

// /. interfaces

const initialState: formSliceTypes = {
    formAuthFields: [
        {
            id: 1,
            htmlFor: 'email',
            label: 'Email Addres',
            placeholder: 'Password'
        },
        {
            id: 2,
            htmlFor: 'password',
            label: 'Email Addres',
            placeholder: 'Password'
        }
    ],
    formRegistrationFields: [
        {
            id: 1,
            htmlFor: 'fullName',
            label: 'Full Name',
            placeholder: 'John Doe'
        },
        {
            id: 2,
            htmlFor: 'email',
            label: 'Email Addres',
            placeholder: 'Password'
        },
        {
            id: 3,
            htmlFor: 'password',
            label: 'Password',
            placeholder: ''
        },
        {
            id: 4,
            htmlFor: 'confirm-password',
            label: 'Confirm Password',
            placeholder: ''
        }
    ]
};

// /. initialState

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
    }
});

export const {
} = formSlice.actions;


export default formSlice.reducer;