import React from 'react';

import { BsEye } from 'react-icons/bs';

// /. imports

interface FormTemplatePropTypes {
    type: string,
    htmlFor: string,
    label: string,
    placeholder: string
}

// /. interfaces

const FormTemplate: React.FC<FormTemplatePropTypes> = (props) => {

    const {
        type,
        htmlFor,
        label,
        placeholder
    } = props;

    return (
        <label className="form__label" htmlFor={htmlFor}>
            {label}
            <input
                className={`form__input ${type === 'password' ? 'form__input--password' : 'form__input--email'}`}
                id={htmlFor}
                type={type}
                placeholder={placeholder}
                required />
            {type === 'password'
                ? <BsEye className="form__icon-password" size={20} />
                : <></>
            }
        </label>
    );
};

export default FormTemplate;