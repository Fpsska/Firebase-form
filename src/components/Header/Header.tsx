import React from 'react';
import { useSelector } from 'react-redux';

import ButtonTemplate from '../Button/ButtonTemplate';

import logo from '../../assets/images/logo_icon.png';

import { RootState } from '../../app/store';

import './header.scss';

// /. imports

const Header: React.FC = () => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    // 
    return (
        <header className="header">
            <div className="header__wrapper">
                <img className="header__image" src={logo} alt="logo" />

                <div className="header__text">
                    <h1 className="header__title">{isAuthorisationPage ? 'Log in to your Account' : 'Create an Account'}</h1>
                    <p className="header__subtitle">{isAuthorisationPage ? 'Welcome back, please enter your details.' : 'Sign up now to get started with an account.'}</p>
                </div>

                <ButtonTemplate />

            </div>
        </header>
    );
};

export default Header;