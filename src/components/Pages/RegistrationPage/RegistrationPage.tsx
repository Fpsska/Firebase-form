import React from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';

import { saveNewUser } from '../../../app/slices/userSlice';

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
                    id: user.uid
                }));
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