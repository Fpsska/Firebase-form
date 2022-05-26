import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { RootState } from '../../../app/store';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';
import Modal from '../../Modal/Modal';

import { saveNewUser, switchUserAuthoriseStatus } from '../../../app/slices/userSlice';
import { switchAuthorisationPageStatus, switchHomePageStatus } from '../../../app/slices/mainSlice';
import { switchAuthErrorStatus } from '../../../app/slices/formSlice';

// /. imports


const AuthorisationPage: React.FC = () => {

    const { modalStatus } = useSelector((state: RootState) => state.modalSlice);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email: string, password: string): void => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(saveNewUser({
                    email: user.email,
                    token: user.refreshToken,
                    id: user.uid,
                    lastSignInTime: user.metadata.lastSignInTime
                }));
                dispatch(switchUserAuthoriseStatus(true));
                dispatch(switchAuthorisationPageStatus(false));
                dispatch(switchHomePageStatus(true));
                navigate('/Authorisation-Form/home');

                dispatch(switchAuthErrorStatus(false)); // reset auth-error status
            })
            .catch((err) => {
                dispatch(switchAuthErrorStatus(true));
            });
    };
    // 
    return (
        <div className="authorisation">
            <div className="authorisation__wrapper">
                <Modal
                    name={'auth-modal'}
                    title={'Authorisation modal!'}
                    status={modalStatus.isModalAuthVisible}
                >
                    Sorry, this method is temporarily unavailable
                    <br />
                    <br />
                    Stasy privet ;)
                </Modal>
                <SectionMark />
                <Form formActionHandler={handleLogin} />
            </div>
        </div>
    );
};


export default AuthorisationPage;