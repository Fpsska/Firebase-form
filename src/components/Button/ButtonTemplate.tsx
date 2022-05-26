import React from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/store';

import {
    switchModalVisibleStatus
} from '../../app/slices/modalSlice';

import './buttonTemplate.scss';

// /. imports

const ButtonTemplate: React.FC = () => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const dispatch = useDispatch();

    const generalButtonHandler = (): void => {
        isAuthorisationPage
            ? dispatch(switchModalVisibleStatus({ name: 'auth-modal', status: true }))
            : dispatch(switchModalVisibleStatus({ name: 'registr-modal', status: true }));
    };
    // 
    return (
        <button className="button" onClick={generalButtonHandler}>
            <FcGoogle size={19} />
            <span className="button__text">{isAuthorisationPage ? 'Continue with Google' : 'Sign up with Google'}</span>
        </button>
    );
};

export default ButtonTemplate;