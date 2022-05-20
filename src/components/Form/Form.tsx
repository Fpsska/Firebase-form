import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/store';

import { formFieldsTypes } from '../../Types/formSliceTypes';

import { switchUserRememberedStatus, switchTermsAcceptedStatus } from '../../app/slices/formSlice';

import FormTemplate from './FormTemplate';

import './form.scss';

// /. imports

const Form: React.FC = () => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const {
        formAuthFields,
        formRegistrationFields,
        isUserRemembered,
        isTermsAccepted
    } = useSelector((state: RootState) => state.formSlice);
    const [currentFieldsData, setCurrentFieldsData] = useState<formFieldsTypes[]>(formAuthFields);

    const dispatch = useDispatch();

    useEffect(() => {
        isAuthorisationPage ? setCurrentFieldsData(formAuthFields) : setCurrentFieldsData(formRegistrationFields);
    }, [isAuthorisationPage]);

    const inputRememberHandler = (): void => {
        dispatch(switchUserRememberedStatus(!isUserRemembered));
    };

    const inputTermsHandler = (): void => {
        dispatch(switchTermsAcceptedStatus(!isTermsAccepted));
    };
    // 
    return (
        <form className="form">
            <div className="form__wrapper">

                {currentFieldsData.map(item => {
                    return (
                        <FormTemplate
                            key={item.id}
                            type={item.type}
                            htmlFor={item.htmlFor}
                            label={item.label}
                            placeholder={item.placeholder}
                        />
                    );
                })}

                {isAuthorisationPage
                    ?
                    <div className="form__terms">
                        <label className="form__label form__label--terms" htmlFor="remember" >
                            <input className="form__input form__input--checkbox" type="checkbox" id="remember" onClick={inputRememberHandler} />
                            <span className="form__fake-checkbox"></span>
                            Remember me
                        </label>
                        <span className="form__restore">Forgot Password?</span>
                    </div>
                    :
                    <label className="form__label form__label--terms" htmlFor="terms" >
                        <input className="form__input form__input--checkbox" type="checkbox" id="terms" onClick={inputTermsHandler} />
                        <span className="form__fake-checkbox"></span>
                        <span className="form__terms-text"> I have read and agree to the{' '}
                            <a href="#" className="form__terms-link">Terms of Service</a>
                        </span>
                    </label>
                }

                <button className="form__button">{isAuthorisationPage ? 'Log in' : 'Get Started'}</button>

            </div>
        </form>
    );
};

export default Form;