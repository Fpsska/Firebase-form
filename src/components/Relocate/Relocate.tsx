import React from 'react';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { switchAuthorisationPageStatus } from '../../app/slices/mainSlice';

import './relocate.scss';

// /. imports

const Relocate: React.FC = () => {
    const { isAuthorisationPage } = useAppSelector(state => state.mainSlice);

    const dispatch = useAppDispatch();

    // /. hooks

    const relocateToAuthPage = (): void => {
        dispatch(switchAuthorisationPageStatus(false));
    };

    const relocateToLoginPage = (): void => {
        dispatch(switchAuthorisationPageStatus(true));
    };

    // /. functions

    return (
        <div className="relocate">
            {isAuthorisationPage ? (
                <p className="relocate__create">
                    Don`t have an account?{' '}
                    <Link
                        className="relocate__link"
                        to="/Authorisation-Form/Registration"
                        onClick={relocateToAuthPage}
                        state={'create-page'}
                    >
                        Sign Up
                    </Link>
                </p>
            ) : (
                <p className="relocate__login">
                    Already have an account?{' '}
                    <Link
                        className="relocate__link"
                        to="/Authorisation-Form"
                        onClick={relocateToLoginPage}
                        state={'auth-page'}
                    >
                        Log in
                    </Link>
                </p>
            )}
        </div>
    );
};

export default Relocate;
