import React from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';

import { saveNewUser, switchUserAuthoriseStatus } from '../../../app/slices/userSlice';
import { switchAuthorisationPageStatus, switchHomePageStatus } from '../../../app/slices/mainSlice';

// /. imports

const RegistrationPage: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegistration = (email: string, password: string): void => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
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
            })
            .catch((err) => {
                console.log('err from registr', err.message);
            });
    };
    // 
    return (
        <div className="registration">
            <div className="registration__wrapper">
                <SectionMark />
                <Form formActionHandler={handleRegistration} />
            </div>
        </div>
    );
};

export default RegistrationPage;