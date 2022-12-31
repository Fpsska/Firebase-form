import React, { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { getRandomItgrNumber } from '../../helpers/getRandomNum';

import {
    switchModalVisibleStatus,
    setNewModalPosition
} from '../../app/slices/modalSlice';

import './buttonTemplate.scss';

// /. imports

interface propTypes {
    text: any; //  JSX.Element
}

// /. interfaces

const ButtonTemplate: React.FC<propTypes> = ({ text }) => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);

    const [disabledStatus, setDisabledStatus] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // /. hooks

    const generalButtonHandler = (): void => {
        if (pageStatuses.isAuthPage) {
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
        } else {
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
        }
        // setDisabledStatus(true);
    };

    // /. functions

    return (
        <button
            className="button"
            disabled={disabledStatus}
            onClick={generalButtonHandler}
        >
            <FcGoogle size={19} />
            <span className="button__text">{text}</span>
        </button>
    );
};

export default ButtonTemplate;
