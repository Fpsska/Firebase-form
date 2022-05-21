import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { RootState } from '../../app/store';

import {
    switchPasswordHiddenStatus,
    setCurrentEmail,
    setCurrentPassword
} from '../../app/slices/formSlice';

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

    const { isPasswordHidden } = useSelector((state: RootState) => state.formSlice);
    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);

    const dispatch = useDispatch();

    const inputHandler = (EventValue: string, inputType: string): void => {
        switch (inputType) {
            case 'text':
                dispatch(setCurrentEmail(EventValue));
                break;
            case 'password':
                dispatch(setCurrentPassword(EventValue));
                break;
        }
    };
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
                type={!isPasswordHidden ? 'text' : type}
                placeholder={placeholder}
                required
                onChange={(e) => inputHandler(e.target.value, type)}
            />
            {type === 'password'
                ?
                <>
                    {
                        isPasswordHidden
                            ?
                            <BsEye className="form__icon-password" size={20} color="#000" onClick={() => dispatch(switchPasswordHiddenStatus(false))} />
                            :
                            <BsEyeSlash className="form__icon-password" size={20} color="#000" onClick={() => dispatch(switchPasswordHiddenStatus(true))} />
                    }
                </>
                :
                <></>
            }
        </label>
    );
};

export default FormTemplate;