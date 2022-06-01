import React, { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { RootState } from '../../app/store';

import { getRandomItgrNumber } from '../../helpers/getRandomNum';

import {
    switchModalVisibleStatus,
    setNewModalPosition
} from '../../app/slices/modalSlice';

import './buttonTemplate.scss';

// /. imports

const ButtonTemplate: React.FC = () => {

    const { isAuthorisationPage } = useAppSelector((state: RootState) => state.mainSlice);
    const [disabledStatus, setDisabledStatus] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const generalButtonHandler = (): void => {
        if (isAuthorisationPage) {
            dispatch(switchModalVisibleStatus({ name: 'auth-modal', status: true }));
            dispatch(setNewModalPosition(
                {
                    name: 'auth-modal',
                    coordinates: { top: getRandomItgrNumber(50, 10), left: getRandomItgrNumber(50, 10) }
                }
            ));
        } else {
            dispatch(switchModalVisibleStatus({ name: 'registr-modal', status: true }));
            dispatch(setNewModalPosition(
                {
                    name: 'registr-modal',
                    coordinates: { top: getRandomItgrNumber(90, 10), left: getRandomItgrNumber(90, 10) }
                }
            ));
        }
        setDisabledStatus(true);
        setTimeout(() => {
            setDisabledStatus(false);
        }, 20000);
    };
    // 
    return (
        <button className="button" disabled={disabledStatus} onClick={generalButtonHandler} >
            <FcGoogle size={19} />
            <span className="button__text">{isAuthorisationPage ? 'Continue with Google' : 'Sign up with Google'}</span>
        </button>
    );
};

export default ButtonTemplate;