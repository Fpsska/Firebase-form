import React from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';

import './buttonTemplate.scss';

// /. imports

const ButtonTemplate: React.FC = () => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    // 
    return (
        <button className="button">
            <FcGoogle size={19} />
            <span>{isAuthorisationPage ? 'Continue with Google' : 'Sign up with Google'}</span>
        </button>
    );
};

export default ButtonTemplate;