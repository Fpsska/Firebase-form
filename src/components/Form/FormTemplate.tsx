import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { useLocationData } from '../../hooks/useLocationData';

// /. imports

interface FormTemplatePropTypes {
    type: string;
    htmlFor: string;
    label: string;
    placeholder: string;
}

// /. interfaces

const FormTemplate: React.FC<FormTemplatePropTypes> = props => {
    const { type, htmlFor, label, placeholder } = props;

    const { passwordStatuses } = useAppSelector(state => state.formSlice);

    const { state } = useLocationData();

    // /. hooks

    const isAuthPage = state === 'auth-page';

    // /. variables

    return (
        <label
            className="form__label"
            htmlFor={htmlFor}
        >
            <span className="form__label-text">
                {label}
                {!isAuthPage && <span className="form__label-required">*</span>}
            </span>
            <input
                className={`form__input ${
                    type === 'password'
                        ? 'form__input--password'
                        : 'form__input--email'
                }`}
                id={htmlFor}
                type={!passwordStatuses ? 'text' : type}
                placeholder={placeholder}
                required
            />
        </label>
    );
};

export default FormTemplate;
