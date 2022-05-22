import React from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/store';

import { switchModalAuthVisibleStatus, switchModalRegistrVisibleStatus } from '../../app/slices/mainSlice';


import './buttonTemplate.scss';

// /. imports

const ButtonTemplate: React.FC = () => {

    const { isAuthorisationPage, isModalAuthVisible, isModalRegistrVisible } = useSelector((state: RootState) => state.mainSlice);
    const dispatch = useDispatch();

    const generalButtonHandler = (): void => {
        isAuthorisationPage ? dispatch(switchModalAuthVisibleStatus(true)) : dispatch(switchModalRegistrVisibleStatus(true));
    };
    // 
    return (
        <button className="button" onClick={generalButtonHandler}>
            <FcGoogle size={19} />
            <span>{isAuthorisationPage ? 'Continue with Google' : 'Sign up with Google'}</span>
        </button>
    );
};

export default ButtonTemplate;