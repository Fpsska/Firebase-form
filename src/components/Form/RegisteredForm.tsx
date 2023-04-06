import React from 'react';

import { useNavigate } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useForm } from 'react-hook-form';

import { BsCheck2 } from 'react-icons/bs';

import { generateElPosition } from '../../helpers/generateElPosition';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { switchPreloaderVisibleStatus } from '../../app/slices/mainSlice';

import {
    switchRegistrErrorStatus,
    switchTermsAcceptedStatus,
    switchUserRememberedStatus
} from '../../app/slices/formSlice';

import {
    saveNewUser,
    switchUserAuthoriseStatus
} from '../../app/slices/userSlice';

import {
    switchModalVisibleStatus,
    setNewModalPosition
} from '../../app/slices/modalSlice';

import { useCookie } from '../../hooks/useCookie';

import PswrdIcon from '../PswrdIcon/PswrdIcon';

import ButtonSubmit from './ButtonSubmit';

import './form.scss';

// /. imports

interface IFormFields {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// /. interfaces

const RegisteredForm: React.FC = () => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);

    const { isTermsAccepted, isRegistrError, passwordStatuses } =
        useAppSelector(state => state.formSlice);

    const { modalStatuses, modalSize } = useAppSelector(
        state => state.modalSlice
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm<IFormFields>({
        mode: 'onChange'
    });

    const passwordValue = watch('password');

    const { deleteCookie } = useCookie();

    // /. hooks

    const formSubmitHandler = (userData: any): void => {
        dispatch(switchPreloaderVisibleStatus(true));

        const auth = getAuth();
        const { email, password } = userData;

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(
                    saveNewUser({
                        email: user.email,
                        token: user.refreshToken,
                        id: user.uid,
                        lastSignInTime: new Date().toLocaleString()
                    })
                );

                localStorage.setItem('isUserAuthStatus', JSON.stringify(true));
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        email: user.email,
                        lastSignInTime: new Date().toLocaleString()
                    })
                );
            })
            .then(() => {
                navigate('/home');
                dispatch(switchUserAuthoriseStatus(true));

                dispatch(switchUserRememberedStatus(false));
                localStorage.setItem('isUserRemembered', JSON.stringify(false));
                setTimeout(() => {
                    dispatch(switchPreloaderVisibleStatus(false));
                }, 2000);
                deleteCookie('login');
            })
            .catch((err: any) => {
                console.error(err.message);
                dispatch(switchRegistrErrorStatus(true));
                setTimeout(() => {
                    dispatch(switchPreloaderVisibleStatus(false));
                }, 2000);
                setTimeout(() => {
                    dispatch(switchRegistrErrorStatus(false));
                }, 5000);
            });
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

        const { elTopPos, elLeftPos } = generateElPosition(
            modalSize.width,
            modalSize.height
        );
        dispatch(
            setNewModalPosition({
                name: 'terms-modal',
                coordinates: {
                    top: elTopPos,
                    left: elLeftPos
                }
            })
        );
    };

    // /. functions

    return (
        <form
            className="form"
            onSubmit={handleSubmit(formSubmitHandler)}
        >
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
                            message: 'Entered value does not match email format'
                        }
                    })}
                />
                {errors.email && (
                    <span className="form__error">{errors.email.message}</span>
                )}
                {!errors.email && isRegistrError && (
                    <span className="form__error">Email already in use</span>
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
                            message: 'Minimum length is should be 6 symbols'
                        }
                    })}
                />
                <PswrdIcon inputName={'registr-password'} />
                {errors.password && (
                    <p className="form__error">{errors.password?.message}</p>
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
                            message: 'Minimum length is should be 6 symbols'
                        },
                        validate: (value: string) =>
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
                    id="terms"
                    required
                    onClick={inputTermsHandler}
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
            <ButtonSubmit
                isValid={isValid}
                pageStatuses={pageStatuses}
            />
        </form>
    );
};

export default RegisteredForm;
