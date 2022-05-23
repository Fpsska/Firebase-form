import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/store';

import { formFieldsTypes } from '../../Types/formSliceTypes';

import { switchUserRememberedStatus, switchTermsAcceptedStatus } from '../../app/slices/formSlice';

// import FormTemplate from './FormTemplate';

import './form.scss';

// /. imports

interface FormPropTypes {
    formActionHandler: (arg1: string, arg2: string) => void
}

const Form: React.FC<FormPropTypes> = (props) => {

    const { formActionHandler } = props;

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const {
        formAuthFields,
        formRegistrationFields,
        isUserRemembered,
        isTermsAccepted,
        currentEmail,
        currentPassword
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
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onBlur'
    });

    const FormSubmitHandler = (data: any): void => {
        alert(JSON.stringify(data));
        reset();
        // formActionHandler(currentEmail, currentPassword);
        // e.preventDefault();
    };
    // 
    return (
        <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
            <div className="form__wrapper">

                {isAuthorisationPage
                    ?
                    <>
                        <label className="form__label" htmlFor="email">
                            Email Addres
                            <input
                                id="email"
                                type="text"
                                className="form__input form__input--email"
                                placeholder="johndoe@gmail.com"
                                {...register('email', {
                                    required: 'Field is required!',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Entered value does not match email format'
                                    }
                                })}
                            />
                            {errors.email && <span className="form__error">{errors.email.message}</span>}
                        </label>
                        <label className="form__label" htmlFor="password">
                            Password
                            <input
                                id="password"
                                type="password"
                                className="form__input form__input--password"
                                {...register('password', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 5,
                                        message: 'Minimum length is should be 5 symbols'
                                    }
                                })}
                            />
                            {errors?.password && <p className="form__error">{errors?.password?.message}</p>}
                        </label>
                    </>
                    :
                    <>
                        <label className="form__label" htmlFor="fullName">
                            <span className="form__label-text">
                                FullName
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                className="form__input form__input--email"
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                {...register('fullName', {
                                    required: true,
                                    maxLength: 10
                                })}
                            />
                            {errors.fullName && errors.fullName.type === 'required' && <span className="form__error">Field is required!</span>}
                            {errors.fullName && errors.fullName.type === 'maxLength' && <span className="form__error">Max length exceeded</span>}
                        </label>
                        <label className="form__label" htmlFor="email">
                            <span className="form__label-text">
                                Email Addres
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                id="email"
                                type="text"
                                className="form__input form__input--email"
                                placeholder="johndoe@gmail.com"
                                {...register('email', {
                                    required: 'Field is required!',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Entered value does not match email format'
                                    }
                                })}
                            />
                            {errors.email && <span className="form__error">{errors.email.message}</span>}
                        </label>
                        <label className="form__label" htmlFor="passwor">
                            <span className="form__label-text">
                                Password
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                id="password"
                                type="password"
                                className="form__input form__input--password"
                                {...register('password', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 5,
                                        message: 'Minimum length is should be 5 symbols'
                                    }
                                })}
                            />
                            {errors?.password && <p className="form__error">{errors?.password?.message}</p>}
                        </label>
                        <label className="form__label" htmlFor="confirm-password">
                            <span className="form__label-text">
                                Confirm Password
                                {isAuthorisationPage ? <></> : <span className="form__label-required">*</span>}
                            </span>
                            <input
                                id="confirm-password"
                                type="password"
                                className="form__input form__input--password"
                                {...register('confirmPassword', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 5,
                                        message: 'Minimum length is should be 5 symbols'
                                    }
                                })}
                            />
                            {errors?.confirmPassword && <p className="form__error">{errors?.confirmPassword?.message}</p>}
                        </label>
                    </>
                }
                {/*  */}
                {isAuthorisationPage
                    ?
                    <div className="form__terms">
                        <label className="form__label form__label--terms" htmlFor="remember" >
                            <input
                                className="form__input form__input--checkbox"
                                type="checkbox"
                                id="remember"
                                onClick={inputRememberHandler}
                            />
                            <span className="form__fake-checkbox"></span>
                            Remember me
                        </label>
                        <span className="form__restore">Forgot Password?</span>
                    </div>
                    :
                    <label className="form__label form__label--terms" htmlFor="terms" >
                        <input
                            className="form__input form__input--checkbox"
                            type="checkbox"
                            id="terms"
                            onClick={inputTermsHandler}
                            required
                        />
                        <span className="form__fake-checkbox"></span>
                        <span className="form__terms-text"> I have read and agree to the{' '}
                            <a href="#" className="form__terms-link">Terms of Service</a>
                        </span>
                    </label>
                }

                <button
                    className="form__button"
                    disabled={!isValid}
                >
                    {isAuthorisationPage ? 'Log in' : 'Get Started'}
                </button>

            </div>
        </form>
    );
};

export default Form;