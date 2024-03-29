import React from 'react';

import { useLocation } from 'react-router';

import { useAppSelector } from 'app/hooks';

import ButtonConnect from 'components/ui/ButtonConnect/ButtonConnect';
import Theme from 'components/ui/ThemeButton/ThemeButton';

import logo from 'assets/icons/logo_icon.svg';

import './header.scss';

// /. imports

const Header: React.FC = () => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);
    const { isUserAuthorise } = useAppSelector(state => state.userSlice);

    const { pathname } = useLocation();

    // /. hooks

    const defineButtonTextContent = (currentPath: string): string => {
        switch (currentPath) {
            case '/':
                return 'Continue with Google';
            case '/Registration':
                return 'Sign up with Google';
            default:
                return 'Continue with Google';
        }
    };

    // /. functions

    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__image">
                    <img
                        src={logo}
                        alt="logo"
                    />
                </div>

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
                    <ButtonConnect text={defineButtonTextContent(pathname)} />
                )}
            </div>

            <Theme />
        </header>
    );
};

export default Header;
