import React, { useState, useEffect } from 'react';

import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { RootState } from '../../app/store';

import { switchPasswordVisibleStatuses } from '../../app/slices/formSlice';

// /. imports

interface PswrdIconPropTypes {
    inputName: string
}

const PswrdIcon: React.FC<PswrdIconPropTypes> = (props) => {

    const { inputName } = props;

    const { passwordStatuses } = useAppSelector((state: RootState) => state.formSlice);
    const [statusName, setStatusName] = useState<boolean>();

    const dispatch = useAppDispatch();

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

    return (
        <>
            {
                statusName
                    ?
                    <BsEyeSlash
                        className="form__icon-password"
                        size={20}
                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                            {
                                name: inputName,
                                status: false
                            }
                        ))}
                    />
                    :
                    <BsEye
                        className="form__icon-password"
                        size={20}
                        onClick={() => dispatch(switchPasswordVisibleStatuses(
                            {
                                name: inputName,
                                status: true
                            }
                        ))}
                    />
            }
        </>
    );
};

export default PswrdIcon;
