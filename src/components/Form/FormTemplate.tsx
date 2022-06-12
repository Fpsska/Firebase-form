import React from 'react';

import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

// import {
//     switchPasswordVisibleStatuses
// } from '../../app/slices/formSlice';

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

    const { passwordStatuses } = useAppSelector(state => state.formSlice);
    const { isAuthorisationPage } = useAppSelector(state => state.mainSlice);

    const dispatch = useAppDispatch();
    // 
    return (
        <label className="form__label" htmlFor={htmlFor}>
            <span className="form__label-text">
                {label}
                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
            </span>
            <input
                className={`form__input ${type === 'password' ? 'form__input--password' : 'form__input--email'}`}
                id={htmlFor}
                type={!passwordStatuses ? 'text' : type}
                placeholder={placeholder}
                required
            />
            {type === 'password'
                ?
                <>
                    {/* {
                        passwordStatuses
                            ?
                            <BsEye className="form__icon-password" size={20} color="#000" onClick={() => dispatch(switchPasswordHiddenStatus(false))} />
                            :
                            <BsEyeSlash className="form__icon-password" size={20} color="#000" onClick={() => dispatch(switchPasswordHiddenStatus(true))} />
                    } */}
                </>
                :
                <></>
            }
        </label>
    );
};

export default FormTemplate;