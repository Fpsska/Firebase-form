import React, { useEffect, useState } from 'react';

import { BsEye } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';

import FormTemplate from './FormTemplate';

import './form.scss';

// /. imports

const Form: React.FC = () => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const { formAuthFields, formRegistrationFields } = useSelector((state: RootState) => state.formSlice);
    const [currentFieldsData, setCurrentFieldsData] = useState<any[]>(formAuthFields);

    useEffect(() => {
        isAuthorisationPage ? setCurrentFieldsData(formAuthFields) : setCurrentFieldsData(formRegistrationFields);
    }, [isAuthorisationPage]);

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
                        <label className="form__label form__label--terms" htmlFor="remember">
                            Remember me
                            <input className="form__input form__input--checkbox" type="checkbox" id="remember" />
                        </label>
                        <span className="form__restore">Forgot Password?</span>
                    </div>
                    :
                    <label className="form__label form__label--terms" htmlFor="terms">
                        <span className="form__terms-text"> I have read and agree to the{' '}
                            <a href="#" className="form__terms-link">Terms of Service</a>
                        </span>
                        <input className="form__input form__input--checkbox" type="checkbox" id="terms" />
                    </label>
                }

                <button className="form__button">{isAuthorisationPage ? 'Log in' : 'Get Started'}</button>

            </div>
        </form>
    );
};

export default Form;