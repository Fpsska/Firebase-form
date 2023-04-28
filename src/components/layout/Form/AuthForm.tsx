import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { SubmitHandler, useForm } from 'react-hook-form';

import { BsCheck2 } from 'react-icons/bs';

import { useCookie } from 'hooks/useCookie';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { switchPreloaderVisibleStatus } from 'app/slices/mainSlice';

import {
    switchUserRememberedStatus,
    switchAuthErrorStatus
} from 'app/slices/formSlice';

import { saveNewUser, switchUserAuthoriseStatus } from 'app/slices/userSlice';

import PswrdIcon from 'components/ui/PswrdIcon/PswrdIcon';

import ButtonSubmit from '../../ui/ButtonSubmit/ButtonSubmit';

import './form.scss';

// /. imports

interface IFormFields {
    email: string;
    password: string;
}

// /. interfaces

const AuthForm: React.FC = () => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);

    const { isUserRemembered, isAuthError, passwordStatuses } = useAppSelector(
        state => state.formSlice
    );

    const { isCookieAccepted } = useAppSelector(state => state.cookieSlice);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { setCookie, getCookie } = useCookie();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<IFormFields>({
        mode: 'onChange'
    });

    // /. hooks

    const formSubmitHandler: SubmitHandler<IFormFields> = (
        userData: any
    ): void => {
        dispatch(switchPreloaderVisibleStatus(true));

        const auth = getAuth();
        const { email, password } = userData;

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
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

                if (isUserRemembered) {
                    setCookie({
                        label: 'login',
                        value: userData.email,
                        daysToLive: 1
                    });
                }

                console.log(user);
            })
            .then(() => {
                navigate('/home');
                dispatch(switchUserAuthoriseStatus(true));
                dispatch(switchAuthErrorStatus(false)); // clear auth-error status
                setTimeout(() => {
                    dispatch(switchPreloaderVisibleStatus(false));
                }, 2000);
            })
            .catch((err: any) => {
                console.error(err.message);
                dispatch(switchAuthErrorStatus(true));
                setTimeout(() => {
                    dispatch(switchPreloaderVisibleStatus(false));
                }, 2000);
                setTimeout(() => {
                    dispatch(switchAuthErrorStatus(false));
                }, 5000);
            });
    };

    const inputRememberHandler = (): void => {
        if (isValid && isCookieAccepted) {
            dispatch(switchUserRememberedStatus(!isUserRemembered));
            localStorage.setItem(
                'isUserRemembered',
                JSON.stringify(!isUserRemembered)
            );
        }
    };

    // /. functions

    useEffect(() => {
        // set login value by first render of component
        const isLoginCookieEmpty = getCookie('login') as null;

        const validCondition =
            isCookieAccepted &&
            isUserRemembered &&
            pageStatuses.isAuthPage &&
            isLoginCookieEmpty;

        if (validCondition) {
            setValue('email', getCookie('login'));
        }
    }, [isCookieAccepted, isUserRemembered, pageStatuses]);

    // /. effects

    return (
        <form
            className="form"
            onSubmit={handleSubmit(formSubmitHandler)}
        >
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
                            message: 'Entered value does not match email format'
                        }
                    })}
                />
                {errors.email && (
                    <span className="form__error">{errors.email.message}</span>
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
                            message: 'Minimum length is should be 2 symbols'
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
                        disabled={!isValid || !isCookieAccepted}
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
                <a
                    className="form__restore"
                    href="#"
                >
                    Forgot Password?
                </a>
            </div>
            <ButtonSubmit
                isValid={isValid}
                pageStatuses={pageStatuses}
            />
        </form>
    );
};

export default AuthForm;
