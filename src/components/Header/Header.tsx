import React from 'react';

import ButtonTemplate from '../Button/ButtonTemplate';

import logo from '../../assets/images/logo_icon.png';

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

                <ButtonTemplate/>

            </div>
        </header>
    );
};

export default Header;