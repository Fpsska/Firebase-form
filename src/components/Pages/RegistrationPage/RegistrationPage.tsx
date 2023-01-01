import React from 'react';

import { useNavigate } from 'react-router';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import {
    saveNewUser,
    switchUserAuthoriseStatus
} from '../../../app/slices/userSlice';

import { switchRegistrErrorStatus } from '../../../app/slices/formSlice';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';
import Modal from '../../Modal/Modal';

// /. imports

const RegistrationPage: React.FC<{ wrapperRef: any }> = ({ wrapperRef }) => {
    const { modalStatuses } = useAppSelector(state => state.modalSlice);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const handleRegistration = (email: string, password: string): void => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    saveNewUser({
                        email: user.email,
                        token: user.refreshToken,
                        id: user.uid,
                        lastSignInTime: user.metadata.lastSignInTime
                    })
                );

                dispatch(switchUserAuthoriseStatus(true));
                localStorage.setItem('isUserAuthStatus', JSON.stringify(true));
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        email: user.email,
                        lastSignInTime: user.metadata.lastSignInTime
                    })
                );

                navigate('/Authorisation-Form/home');
                console.log(user);
            })
            .catch((err: any) => {
                dispatch(switchRegistrErrorStatus(true));
                setTimeout(() => {
                    dispatch(switchRegistrErrorStatus(false));
                }, 5000);
            });
    };

    // /. functions

    return (
        <div className="registration">
            <div className="registration__wrapper">
                <>
                    {modalStatuses.isModalRegistrVisible && (
                        <Modal
                            name={'registr-modal'}
                            title={'Rigistration modal!'}
                            status={modalStatuses.isModalRegistrVisible}
                            wrapperRef={wrapperRef}
                        >
                            Technical works..In progess..
                        </Modal>
                    )}
                </>
                <SectionMark />
                <Form
                    formActionHandler={handleRegistration}
                    wrapperRef={wrapperRef}
                />
            </div>
        </div>
    );
};

export default RegistrationPage;
