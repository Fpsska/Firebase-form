import React from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/store';

import { switchModalVisibleStatus } from '../../app/slices/mainSlice';


import './buttonTemplate.scss';

// /. imports

const ButtonTemplate: React.FC = () => {

    const { isAuthorisationPage, isModalVisible } = useSelector((state: RootState) => state.mainSlice);
    const dispatch = useDispatch();
    // 
    return (
        <button className="button" onClick={() => dispatch(switchModalVisibleStatus(!isModalVisible))}>
            <FcGoogle size={19} />
            <span>{isAuthorisationPage ? 'Continue with Google' : 'Sign up with Google'}</span>
        </button>
    );
};

export default ButtonTemplate;