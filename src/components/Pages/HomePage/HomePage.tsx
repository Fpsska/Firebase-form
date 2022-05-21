import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Navigate } from 'react-router';

import { RootState } from '../../../app/store';

import { deleteCurrentUser, switchUserAuthoriseStatus } from '../../../app/slices/userSlice';

// /. imports

const HomePage: React.FC = () => {

    const { currentEmail, isUserAuthorise } = useSelector((state: RootState) => state.userSlice);
    const dispatch = useDispatch();

    const logOutHandler = (): void => {
        dispatch(deleteCurrentUser());
        dispatch(switchUserAuthoriseStatus(false));
    };
    // 
    return isUserAuthorise ? (
        <div className="home">
            <h2 className="home__title">HomePage</h2>
            <button className="home__button" onClick={logOutHandler}>Log out from {currentEmail}</button>
        </div>
    ) : (
        <Navigate to="/Authorisation-Form" />
    );
};

export default HomePage;

