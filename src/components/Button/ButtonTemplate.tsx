import React from 'react';

import { FcGoogle } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../app/store';

import { getRandomItgrNumber } from '../../helpers/getRandomNum';

import {
    switchModalAuthVisibleStatus,
    switchModalRegistrVisibleStatus,
    setNewModalAuthPosition,
    setNewModalRegistrPosition
} from '../../app/slices/mainSlice';

import './buttonTemplate.scss';

// /. imports

const ButtonTemplate: React.FC = () => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const dispatch = useDispatch();

    const generalButtonHandler = (): void => {  // need to fix call all of disptchs
        if (isAuthorisationPage) {
            dispatch(switchModalAuthVisibleStatus(true));
            dispatch(setNewModalAuthPosition({
                top: getRandomItgrNumber(50, 10),
                left: getRandomItgrNumber(50, 10)
            }));
        } else {
            dispatch(switchModalRegistrVisibleStatus(true));
            dispatch(setNewModalRegistrPosition({
                top: getRandomItgrNumber(50, 10),
                left: getRandomItgrNumber(50, 10)
            }));
        }
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