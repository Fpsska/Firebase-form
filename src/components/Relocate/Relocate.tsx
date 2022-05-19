import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { RootState } from '../../app/store';

import { switchAuthorisationPageStatus } from '../../app/slices/mainSlice';

import './relocate.scss';

// /. imports

const Relocate: React.FC = () => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const dispatch = useDispatch();

    const relocateToAuthPage = (): void => {
        dispatch(switchAuthorisationPageStatus(false));
    };

    const relocateToLoginPage = (): void => {
        dispatch(switchAuthorisationPageStatus(true));
    };
    // 
    return (
        <div className="relocate">
            {isAuthorisationPage
                ?
                <p className="relocate__create">Don't have an account?{' '}
                    <Link to="/Authorisation-Form/Registration" className="relocate__link" onClick={relocateToAuthPage}>Sign Up</Link>
                </p>
                :
                <p className="relocate__login">Already have an account?{' '}
                    <Link to="/Authorisation-Form" className="relocate__link" onClick={relocateToLoginPage}>Log in</Link>
                </p>
            }
        </div>
    );
};

export default Relocate;