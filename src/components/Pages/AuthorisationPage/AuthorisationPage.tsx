import React from 'react';

import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import {
    saveNewUser,
    switchUserAuthoriseStatus
} from '../../../app/slices/userSlice';
import { switchAuthErrorStatus } from '../../../app/slices/formSlice';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';
import Modal from '../../Modal/Modal';

// /. imports

const AuthorisationPage: React.FC<{ wrapperRef: any }> = ({ wrapperRef }) => {
    const { modalStatuses } = useAppSelector(state => state.modalSlice);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // /. hooks

    const handleLogin = (email: string, password: string): void => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    saveNewUser({
                        email: user.email,
                        token: user.refreshToken,
                        id: user.uid,
                        lastSignInTime: user.metadata.lastSignInTime
                    })
                );
                navigate('/Authorisation-Form/home');

                dispatch(switchUserAuthoriseStatus(true));
                localStorage.setItem('isUserAuthStatus', JSON.stringify(true));
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        email: user.email,
                        lastSignInTime: user.metadata.lastSignInTime
                    })
                );

                dispatch(switchAuthErrorStatus(false)); // reset auth-error status
                console.log(user);
            })
            .catch((err: any) => {
                console.error(err.message);
                dispatch(switchAuthErrorStatus(true));
                setTimeout(() => {
                    dispatch(switchAuthErrorStatus(false));
                }, 5000);
            });
    };

    // /. functions

    return (
        <div className="authorisation">
            <div className="authorisation__wrapper">
                <>
                    {modalStatuses.isModalAuthVisible && (
                        <Modal
                            name={'auth-modal'}
                            title={'Authorisation modal!'}
                            status={modalStatuses.isModalAuthVisible}
                            wrapperRef={wrapperRef}
                        >
                            <>
                                Sorry, this method is temporarily unavailable
                                <br />
                                <br />
                                Stasy privet ;)
                            </>
                        </Modal>
                    )}
                </>
                <SectionMark />
                <Form formActionHandler={handleLogin} />
            </div>
        </div>
    );
};

export default AuthorisationPage;
