import React, { useEffect } from 'react';

import { useAppSelector } from '../../app/hooks';

import ButtonTemplate from '../Button/ButtonTemplate';
import Theme from '../Theme/Theme';

import logo from '../../assets/images/logo_icon.png';

import './header.scss';
import { useLocationData } from '../../hooks/useLocationData';

// /. imports

const Header: React.FC = () => {
    const { isAuthorisationPage, isHomePage } = useAppSelector(
        state => state.mainSlice
    );
    const { isUserAuthorise } = useAppSelector(state => state.userSlice);

    const { state } = useLocationData();

    // /. hooks

    useEffect(() => {
        console.log(state);
    }, [state]);

    // /. effects

    const defineButtonTextContent = (value: string): string => {
        switch (value) {
            case null:
                return 'Continue with Google';
            case 'auth-page':
                return 'Continue with Google';
            case 'create-page':
                return 'Sign up with Google';
            default:
                return '';
        }
    };

    return (
        <header className="header">
            <div className="header__wrapper">
                <img
                    className="header__image"
                    src={logo}
                    alt="logo"
                />

                <div className="header__text">
                    <h1 className="header__title">
                        {isAuthorisationPage
                            ? 'Log in to your Account'
                            : isHomePage && isUserAuthorise
                            ? 'Welcome to your profile page!'
                            : 'Create an Account'}
                    </h1>
                    {!isHomePage && !isUserAuthorise && (
                        <p className="header__subtitle">
                            {isAuthorisationPage
                                ? 'Welcome back, please enter your details.'
                                : 'Sign up now to get started with an account.'}
                        </p>
                    )}
                </div>

                {!isHomePage && (
                    <ButtonTemplate text={defineButtonTextContent(state)} />
                )}
            </div>

            <Theme />
        </header>
    );
};

export default Header;
