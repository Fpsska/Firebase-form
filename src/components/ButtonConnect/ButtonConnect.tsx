import React, { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { getRandomItgrNumber } from '../../helpers/getRandomNum';

import {
    switchModalVisibleStatus,
    setNewModalPosition
} from '../../app/slices/modalSlice';

import './button-connect.scss';

// /. imports

interface propTypes {
    text: string; //  JSX.Element
}

// /. interfaces

const ButtonConnect: React.FC<propTypes> = ({ text }) => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);

    const [disabledStatus, setDisabledStatus] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // /. hooks

    const onAuthBtnClick = (): void => {
        dispatch(
            switchModalVisibleStatus({ name: 'auth-modal', status: true })
        );
        dispatch(
            setNewModalPosition({
                name: 'auth-modal',
                coordinates: {
                    top: getRandomItgrNumber(50, 10),
                    left: getRandomItgrNumber(50, 10)
                }
            })
        );
    };

    const onRegistrBtnClick = (): void => {
        dispatch(
            switchModalVisibleStatus({
                name: 'registr-modal',
                status: true
            })
        );
        dispatch(
            setNewModalPosition({
                name: 'registr-modal',
                coordinates: {
                    top: getRandomItgrNumber(90, 10),
                    left: getRandomItgrNumber(90, 10)
                }
            })
        );
    };

    const handleButtonEvent = (): void => {
        pageStatuses.isAuthPage ? onAuthBtnClick() : onRegistrBtnClick();
        // setDisabledStatus(true);
    };

    // /. functions

    return (
        <button
            className="button"
            type="button"
            disabled={disabledStatus}
            onClick={handleButtonEvent}
        >
            <FcGoogle size={19} />
            <span className="button__text">{text}</span>
        </button>
    );
};

export default ButtonConnect;
