import React from 'react';

import { useAppSelector } from '../../app/hooks';

import ButtonTemplate from '../Button/ButtonTemplate';
import Theme from '../ThemeButton/ThemeButton';

import { useLocationData } from '../../hooks/useLocationData';

import logo from '../../assets/images/logo_icon.png';

import './header.scss';

// /. imports

const Header: React.FC = () => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);
    const { isUserAuthorise } = useAppSelector(state => state.userSlice);

    const { pathname } = useLocationData();

    // /. hooks

    const defineButtonTextContent = (currentPath: string): string => {
        switch (currentPath) {
            case '/Authorisation-Form':
                return 'Continue with Google';
            case '/Authorisation-Form/Registration':
                return 'Sign up with Google';
            default:
                return 'Continue with Google';
        }
    };

    // /. functions

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
                        {pageStatuses.isAuthPage
                            ? 'Log in to your Account'
                            : pageStatuses.isHomePage && isUserAuthorise
                            ? 'Welcome to your profile page!'
                            : 'Create an Account'}
                    </h1>
                    {!pageStatuses.isHomePage && !isUserAuthorise && (
                        <p className="header__subtitle">
                            {pageStatuses.isAuthPage
                                ? 'Welcome back, please enter your details.'
                                : 'Sign up now to get started with an account.'}
                        </p>
                    )}
                </div>

                {!pageStatuses.isHomePage && (
                    <ButtonTemplate text={defineButtonTextContent(pathname)} />
                )}
            </div>

            <Theme />
        </header>
    );
};

export default Header;
