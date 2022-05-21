import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Navigate } from 'react-router';

import { RootState } from '../../../app/store';

import { deleteCurrentUser, switchUserAuthoriseStatus } from '../../../app/slices/userSlice';
import { switchAuthorisationPageStatus, switchHomePageStatus } from '../../../app/slices/mainSlice';

import './homePage.scss';

// /. imports  

const HomePage: React.FC = () => {

    const { currentEmail, isUserAuthorise, lastSignInTime } = useSelector((state: RootState) => state.userSlice);
    const dispatch = useDispatch();

    const logOutHandler = (): void => {
        dispatch(deleteCurrentUser());
        dispatch(switchUserAuthoriseStatus(false));
        dispatch(switchAuthorisationPageStatus(true));
        dispatch(switchHomePageStatus(false));
    };
    // 
    return isUserAuthorise ? (
        <div className="home">
            <div className="home__wrapper">
                <ul className="home__user-data user-data">
                    <li className="user-data__template">lastSignInTime: <span className="user-data__info">{lastSignInTime}</span></li>
                    <li className="user-data__template">email: <span className="user-data__info">{currentEmail}</span></li>
                </ul>
                <button className="home__button" onClick={logOutHandler}>Log out from {currentEmail}</button>
            </div>
        </div>
    ) : (
        <Navigate to="/Authorisation-Form" />
    );
};

export default HomePage;

