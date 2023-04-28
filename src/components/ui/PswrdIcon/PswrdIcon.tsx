import React, { useState, useEffect } from 'react';

import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { switchPasswordVisibleStatuses } from 'app/slices/formSlice';

// /. imports

interface PswrdIconPropTypes {
    inputName: string;
}

// /. interfaces

const PswrdIcon: React.FC<PswrdIconPropTypes> = props => {
    const { inputName } = props;

    const { passwordStatuses } = useAppSelector(state => state.formSlice);

    const [isPasswordVisible, setPasswordVisibleStatus] = useState<boolean>();

    const dispatch = useAppDispatch();

    // /. hooks

    useEffect(() => {
        switch (inputName) {
            case 'auth-password':
                setPasswordVisibleStatus(
                    passwordStatuses.isAuthPasswordVisible
                );
                break;
            case 'registr-password':
                setPasswordVisibleStatus(
                    passwordStatuses.isRegistrPasswordVisible
                );
                break;
            case 'confirm-password':
                setPasswordVisibleStatus(
                    passwordStatuses.isConfirmPasswordVisible
                );
                break;
        }
    }, [inputName, passwordStatuses]);

    // /. effects

    return (
        <button
            type="button"
            className="form__icon-password"
            aria-label={isPasswordVisible ? 'hide password' : 'show password'}
        >
            {isPasswordVisible ? (
                <BsEyeSlash
                    size={20}
                    onClick={() =>
                        dispatch(
                            switchPasswordVisibleStatuses({
                                name: inputName,
                                status: false
                            })
                        )
                    }
                />
            ) : (
                <BsEye
                    size={20}
                    onClick={() =>
                        dispatch(
                            switchPasswordVisibleStatuses({
                                name: inputName,
                                status: true
                            })
                        )
                    }
                />
            )}
        </button>
    );
};

export default PswrdIcon;
