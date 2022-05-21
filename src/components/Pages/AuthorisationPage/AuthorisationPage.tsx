import React from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';

import { saveNewUser, switchUserAuthoriseStatus } from '../../../app/slices/userSlice';
import { switchAuthorisationPageStatus, switchHomePageStatus } from '../../../app/slices/mainSlice';
// /. imports

const AuthorisationPage: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email: string, password: string): void => {
        const auth = getAuth();
        console.log(auth);
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
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    // 
    return (
        <div className="authorisation">
            <div className="authorisation__wrapper">
                <SectionMark />
                <Form formActionHandler={handleLogin} />
            </div>
        </div>
    );
};


export default AuthorisationPage;