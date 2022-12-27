import React, { useState, useEffect } from 'react';

import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { switchPasswordVisibleStatuses } from '../../app/slices/formSlice';

// /. imports

interface PswrdIconPropTypes {
    inputName: string;
}

// /. interfaces

const PswrdIcon: React.FC<PswrdIconPropTypes> = props => {
    const { inputName } = props;

    const { passwordStatuses } = useAppSelector(state => state.formSlice);

    const [statusName, setStatusName] = useState<boolean>();

    const dispatch = useAppDispatch();

    // /. hooks

    useEffect(() => {
        switch (inputName) {
            case 'auth-password':
                setStatusName(passwordStatuses.isAuthPasswordVisible);
                break;
            case 'registr-password':
                setStatusName(passwordStatuses.isRegistrPasswordVisible);
                break;
            case 'confirm-password':
                setStatusName(passwordStatuses.isConfirmPasswordVisible);
                break;
        }
    }, [inputName, passwordStatuses]);

    // /. effects

    return (
        <>
            {statusName ? (
                <BsEyeSlash
                    className="form__icon-password"
                    size={20}
                    onClick={() =>
                        dispatch(
                            switchPasswordVisibleStatuses({
                                name: inputName,
                                status: false
                            })
                        )
                    }
                    aria-label="show password"
                />
            ) : (
                <BsEye
                    className="form__icon-password"
                    size={20}
                    onClick={() =>
                        dispatch(
                            switchPasswordVisibleStatuses({
                                name: inputName,
                                status: true
                            })
                        )
                    }
                    aria-label="hide password"
                />
            )}
        </>
    );
};

export default PswrdIcon;
