import React from 'react';

import { FcGoogle } from 'react-icons/fc';

import logo from '../../assets/images/logo_icon.svg';

import './header.scss';

// /. imports

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__wrapper">
                <img className="header__image" src={logo} alt="logo" />

                <div className="header__text">
                    <h1 className="header__title">Log in to your Account</h1>
                    <p className="header__subtitle">Welcome back, please enter your details.</p>
                </div>

                <button className="header__button">
                    <FcGoogle size={19} />
                    <span>Continue with Google</span>
                </button>
            </div>
        </header>
    );
};

export default Header;