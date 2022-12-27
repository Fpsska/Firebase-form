import React from 'react';

import { useNavigate } from 'react-router';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';
import Modal from '../../Modal/Modal';

import {
    saveNewUser,
    switchUserAuthoriseStatus
} from '../../../app/slices/userSlice';
import {
    switchAuthorisationPageStatus,
    switchHomePageStatus
} from '../../../app/slices/mainSlice';
import { switchRegistrErrorStatus } from '../../../app/slices/formSlice';

// /. imports

const RegistrationPage: React.FC = () => {
    const { modalStatus } = useAppSelector(state => state.modalSlice);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const handleRegistration = (email: string, password: string): void => {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(
                    saveNewUser({
                        email: user.email,
                        token: user.refreshToken,
                        id: user.uid,
                        lastSignInTime: user.metadata.lastSignInTime
                    })
                );
                dispatch(switchUserAuthoriseStatus(true));
                dispatch(switchAuthorisationPageStatus(false));
                dispatch(switchHomePageStatus(true));
                navigate('/Authorisation-Form/home');
            })
            .catch(err => {
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
                <Modal
                    name={'registr-modal'}
                    title={'Rigistration modal!'}
                    status={modalStatus.isModalRegistrVisible}
                >
                    Technical works..In progess..
                </Modal>
                <SectionMark />
                <Form formActionHandler={handleRegistration} />
            </div>
        </div>
    );
};

export default RegistrationPage;
