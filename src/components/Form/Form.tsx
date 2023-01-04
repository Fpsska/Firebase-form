import React, { useState, useEffect } from 'react';

import { BsCheck2 } from 'react-icons/bs';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { getRandomItgrNumber } from '../../helpers/getRandomNum';

import {
    switchUserRememberedStatus,
    switchTermsAcceptedStatus
} from '../../app/slices/formSlice';

import {
    setNewModalPosition,
    switchModalVisibleStatus
} from '../../app/slices/modalSlice';

import { switchPreloaderVisibleStatus } from '../../app/slices/mainSlice';

import { useCookie } from '../../hooks/useCookie';

import Modal from '../Modal/Modal';
import PswrdIcon from '../PswrdIcon/PswrdIcon';

import './form.scss';

// /. imports

interface propTypes {
    formActionHandler: (arg1: string, arg2: string) => void;
    wrapperRef?: any;
}

interface IFormFields {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
}

// /. interfaces

const Form: React.FC<propTypes> = props => {
    const { formActionHandler, wrapperRef } = props;

    const { pageStatuses } = useAppSelector(state => state.mainSlice);
    const { modalStatuses } = useAppSelector(state => state.modalSlice);
    const { isTermsAccepted, isAuthError, isRegistrError, passwordStatuses } =
        useAppSelector(state => state.formSlice);

    const [isUserRemembered, setUserRememberedStatus] =
        useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { setCookie, getCookie } = useCookie();

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm<IFormFields>({
        mode: 'onChange'
    });

    const passwordValue = watch('password');

    // /. hooks

    const inputRememberHandler = (): void => {
        if (isValid) {
            setUserRememberedStatus(!isUserRemembered);
            localStorage.setItem(
                'isUserRemembered',
                JSON.stringify(!isUserRemembered)
            );
        }
    };

    const inputTermsHandler = (): void => {
        dispatch(switchTermsAcceptedStatus(!isTermsAccepted));
    };

    const linkTermsHandler = (e: any): void => {
        e.preventDefault();

        dispatch(
            switchModalVisibleStatus({
                name: 'terms-modal',
                status: !modalStatuses.isModalTermsVisible
            })
        );
        // dispatch(
        //     setNewModalPosition({
        //         name: 'terms-modal',
        //         coordinates: {
        //             top: getRandomItgrNumber(30, 10),
        //             left: getRandomItgrNumber(30, 10)
        //         }
        //     })
        // );
    };

    const formSubmitHandler: SubmitHandler<IFormFields> = (
        userData: any,
        e: any
    ): void => {
        e.preventDefault();

        dispatch(switchPreloaderVisibleStatus(true));
        formActionHandler(userData.email, userData.password);

        if (isUserRemembered) {
            setCookie({
                label: 'login',
                value: userData.email,
                daysToLive: 1
            });
        }

        setTimeout(() => {
            dispatch(switchPreloaderVisibleStatus(false));
        }, 2000);
    };

    // /. functions

    useEffect(() => {
        // remember checkbox condition when component is re-render
        const isStorageUserRemembered =
            localStorage.getItem('isUserRemembered');
        if (isStorageUserRemembered) {
            setUserRememberedStatus(JSON.parse(isStorageUserRemembered));
        }
    }, [isUserRemembered]);

    useEffect(() => {
        // set login value by first render of component
        if (isUserRemembered) {
            setValue('email', getCookie('login'));
        }
    }, [isUserRemembered]);

    // /. effects

    return (
        <form
            className="form"
            onSubmit={handleSubmit(formSubmitHandler)}
        >
            <div className="form__wrapper">
                {pageStatuses.isAuthPage ? (
                    <>
                        <label className="form__label">
                            Email Address
                            <input
                                className="form__input form__input--email"
                                type="text"
                                placeholder="johndoe@gmail.com"
                                {...register('email', {
                                    required: 'Field is required!',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message:
                                            'Entered value does not match email format'
                                    }
                                })}
                            />
                            {errors.email && (
                                <span className="form__error">
                                    {errors.email.message}
                                </span>
                            )}
                            {!errors.email && isAuthError && (
                                <span className="form__error">
                                    Incorrect email or password
                                </span>
                            )}
                        </label>
                        {/* /. auth email */}
                        <label className="form__label">
                            Password
                            <input
                                className="form__input form__input--password"
                                type={
                                    passwordStatuses.isAuthPasswordVisible
                                        ? 'text'
                                        : 'password'
                                }
                                {...register('password', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 2,
                                        message:
                                            'Minimum length is should be 2 symbols'
                                    }
                                })}
                            />
                            <PswrdIcon inputName={'auth-password'} />
                            {errors.password && (
                                <span className="form__error">
                                    {errors.password.message}
                                </span>
                            )}
                            {!errors.password && isAuthError && (
                                <span className="form__error">
                                    Incorrect email or password
                                </span>
                            )}
                        </label>
                        {/* /. auth password */}
                        <div className="form__terms">
                            <label
                                className="form__label form__label--remember"
                                htmlFor="remember"
                            >
                                <input
                                    className="form__input form__input--checkbox"
                                    id="remember"
                                    type="checkbox"
                                    disabled={!isValid}
                                    checked={isUserRemembered}
                                    onChange={() => null}
                                />
                                <span className="form__fake-checkbox">
                                    <BsCheck2
                                        size={'14px'}
                                        color={'#fff'}
                                    />
                                </span>
                                <span
                                    className="form__label-text"
                                    onClick={inputRememberHandler}
                                >
                                    Remember me
                                </span>
                            </label>
                            <span className="form__restore">
                                Forgot Password?
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <label className="form__label">
                            <span className="form__label-text">
                                FullName
                                <span className="form__label-required">*</span>
                            </span>
                            <input
                                className="form__input form__input--email"
                                type="text"
                                placeholder="John Doe"
                                {...register('fullName', {
                                    required: 'Field is required!',
                                    maxLength: {
                                        value: 10,
                                        message: 'Max length exceeded'
                                    }
                                })}
                            />
                            {errors.fullName && (
                                <span className="form__error">
                                    {errors.fullName.message}
                                </span>
                            )}
                        </label>
                        {/* /. reg name */}

                        <label className="form__label">
                            <span className="form__label-text">
                                Email Address
                                <span className="form__label-required">*</span>
                            </span>
                            <input
                                type="text"
                                className="form__input form__input--email"
                                placeholder="johndoe@gmail.com"
                                {...register('email', {
                                    required: 'Field is required!',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message:
                                            'Entered value does not match email format'
                                    }
                                })}
                            />
                            {errors.email && (
                                <span className="form__error">
                                    {errors.email.message}
                                </span>
                            )}
                            {!errors.email && isRegistrError && (
                                <span className="form__error">
                                    Email already in use
                                </span>
                            )}
                        </label>
                        {/* /. reg email */}

                        <label className="form__label">
                            <span className="form__label-text">
                                Password
                                <span className="form__label-required">*</span>
                            </span>
                            <input
                                className="form__input form__input--password"
                                type={
                                    passwordStatuses.isRegistrPasswordVisible
                                        ? 'text'
                                        : 'password'
                                }
                                {...register('password', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Minimum length is should be 6 symbols'
                                    }
                                })}
                            />
                            <PswrdIcon inputName={'registr-password'} />
                            {errors.password && (
                                <p className="form__error">
                                    {errors.password?.message}
                                </p>
                            )}
                        </label>
                        {/* /. reg password */}

                        <label className="form__label">
                            <span className="form__label-text">
                                Confirm Password
                                <span className="form__label-required">*</span>
                            </span>
                            <input
                                className="form__input form__input--password"
                                type={
                                    passwordStatuses.isConfirmPasswordVisible
                                        ? 'text'
                                        : 'password'
                                }
                                onPaste={e => {
                                    e.preventDefault();
                                    return false;
                                }}
                                {...register('confirmPassword', {
                                    required: 'Field is required!',
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Minimum length is should be 6 symbols'
                                    },
                                    validate: value =>
                                        value === passwordValue ||
                                        'The password do not match'
                                })}
                            />
                            <PswrdIcon inputName={'confirm-password'} />
                            {errors.confirmPassword && (
                                <p className="form__error">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </label>
                        {/* /. reg confirm password */}
                        <label
                            className="form__label form__label--terms"
                            htmlFor="terms"
                        >
                            <input
                                className="form__input form__input--checkbox"
                                type="checkbox"
                                onClick={inputTermsHandler}
                                required
                            />
                            <span className="form__fake-checkbox">
                                <BsCheck2
                                    size={'14px'}
                                    color={'#fff'}
                                />
                            </span>
                            <span className="form__terms-text">
                                {' '}
                                I have read and agree to the{' '}
                                <a
                                    href="#"
                                    className="form__terms-link"
                                    onClick={e => linkTermsHandler(e)}
                                >
                                    Terms of Service
                                </a>
                            </span>
                        </label>
                    </>
                )}

                <button
                    className="form__button"
                    type="submit"
                    disabled={!isValid}
                >
                    {pageStatuses.isAuthPage ? 'Log in' : 'Get Started'}
                </button>

                <>
                    {modalStatuses.isModalTermsVisible && (
                        <Modal
                            name={'terms-modal'}
                            title={'Terms modal!'}
                            status={modalStatuses.isModalTermsVisible}
                            wrapperRef={wrapperRef}
                        >
                            <div className="modal__scroll-content">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Rerum, laboriosam quod dolorem
                                ab quisquam ipsam aliquid tempora quia aliquam
                                at consequatur saepe iusto perferendis magni
                                inventore, id, quam non fugit. Dsit amet
                                consectetur adipisicing elit. Rerum, laboriosam
                                quod dolorem ab quisquam ipsam aliquid tempora
                                quia aliquam at consequatur saepe iusto
                                perferendis magni inventore, id, quam non
                                fugit.Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Rerum, laboriosam quod dolorem
                                ab quisquam ipsam aliquid tempora quia aliquam
                                at consequatur saepe iusto perferendis magni
                                inventore, id, quam non fugit. Dsit amet
                                consectetur adipisicing elit. Rerum, laboriosam
                                quod dolorem ab quisquam ipsam aliquid tempora
                                quia aliquam at consequatur saepe iusto
                                perferendis magni inventore, id, quam non fugit.
                            </div>
                        </Modal>
                    )}
                </>
            </div>
        </form>
    );
};

export default Form;
